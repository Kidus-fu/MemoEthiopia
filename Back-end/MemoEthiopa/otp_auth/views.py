from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import timedelta
from .serializers import VerifyOTPSerializer , SendOTPSerializer
from .models import User, OTP  # Assuming these are your models
from django.core.mail import send_mail


def send_email(to_email, otp_code):
    subject = 'Your OTP Code'
    message = f'Your OTP code is: {otp_code} forget a link'
    from_email = 'seeh51593@gmail.com'
    send_mail(subject, message, from_email, [to_email])

@api_view(['POST'])
def send_otp(request):
    serializer = SendOTPSerializer(data=request.data)
    
    if serializer.is_valid():
        email = serializer.validated_data['email']
        
        try:
            user = User.objects.get(email=email)

            # Generate OTP
            otp_code = OTP.generate_otp()

            # Create OTP instance and save it to the database
            otp = OTP.objects.create(user=user, otp_code=otp_code)

            # Send OTP via email (you would need to implement the email sending logic)
            send_email(user.email, otp_code)  # Example function for sending OTP
           
            return Response({'message': 'OTP sent successfully!'})
        
        except User.DoesNotExist:

            return Response({'error': 'User not found'}, status=400)

    return Response(serializer.errors, status=400)



@api_view(['POST'])
def verify_otp(request):
    serializer = VerifyOTPSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp_code = serializer.validated_data['otp_code']

        try:
            user = User.objects.get(email=email)
            latest_otp = OTP.objects.filter(user=user).order_by('-created_at').first()

            if latest_otp:
                # Check if OTP is within 15-minute validity period
                time_difference = timezone.now() - latest_otp.created_at
                if latest_otp.otp_code == otp_code and time_difference < timedelta(minutes=15):
                    latest_otp.delete()
                    return Response({'message': 'OTP verified successfully!'})
                else:
                    latest_otp.delete()
                    return Response({'error': 'Invalid or expired OTP'}, status=400)
            else:
                return Response({'error': 'No OTP found'}, status=400)

        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=400)
    
    return Response(serializer.errors, status=400)
