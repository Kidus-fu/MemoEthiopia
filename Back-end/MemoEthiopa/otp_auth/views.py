from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from datetime import timedelta
from .serializers import VerifyOTPSerializer , SendOTPSerializer
from .models import User, OTP  # Assuming these are your models
from django.core.mail import send_mail
from notes.models import userInfo
from rest_framework.decorators import permission_classes

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
        
        users = User.objects.filter(email=email)
        if users.exists():
            user = users.first()  # Use the first user in the queryset

            # Generate OTP
            otp_code = OTP.generate_otp()

            # Create OTP instance and save it to the database
            otp = OTP.objects.create(user=user, otp_code=otp_code)

            # Send OTP via email (you would need to implement the email sending logic)
            send_email(user.email, otp_code)  # Example function for sending OTP
           
            return Response({'message': 'OTP sent successfully!'})
        else:
            return Response({'error': 'User not found'}, status=400)

    return Response(serializer.errors, status=400)



@api_view(['POST'])
def verify_otp(request):
    serializer = VerifyOTPSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp_code = serializer.validated_data['otp_code']

        users = User.objects.filter(email=email)
        if users.exists():
            user = users.first()  # Use the first user in the queryset
            latest_otp = OTP.objects.filter(user=user).order_by('-created_at').first()
            verify_user = userInfo.objects.get(user=user)

            if latest_otp:
                # Check if OTP is within 15-minute validity period
                time_difference = timezone.now() - latest_otp.created_at
                if latest_otp.otp_code == otp_code and time_difference < timedelta(minutes=15):
                    verify_user.is_verfied = True
                    verify_user.save()
                    latest_otp.delete()
                    return Response({'message': 'OTP verified successfully!'})
                else:
                    latest_otp.delete()
                    return Response({'error': 'Invalid or expired OTP'}, status=400)
            else:
                return Response({'error': 'No OTP found'}, status=400)

        else:
            return Response({'error': 'User not found'}, status=400)
    
    return Response(serializer.errors, status=400)
