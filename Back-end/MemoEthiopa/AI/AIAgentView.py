from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .AIAgent import agent_executor
# Import your initialized agent

class LangChainAgentView(APIView):
    def post(self, request):
        user_input = request.data.get("input", "")
        if not user_input:
            return Response({"error": "Missing 'input' in request data."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = agent_executor.invoke({"input": user_input})
            return Response({"response": result.get("output", "")}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)