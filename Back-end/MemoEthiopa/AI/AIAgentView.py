from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .AIAgent import agent_executor
# Import your initialized agent


# post data example 
# {
# "user_prompt":"hi",
# "metadata":{
#       "name":"kidus",
#       "user_uuid":"eejdihdjkncfksjfu",
#       "location":"Ethiopia",
#       "tools":"",
#        "chat-session":{
#               "uuid":"355e0501-e880-4f8f-a744-f1e3301b59b8",
#               "title":""
#               }
#       "choose_note":{
#               "note_uuid":"idjsfnkdsjfs"
#               }
# }
# }


class LangChainAgentView(APIView):
    def post(self, request):
        user_prompt = request.data.get("user_prompt", "")
        clear_prompt = ""
        metadata = request.data.get("metadata",{})
        if not metadata:    
            return Response({"error":"Meta Data requerment to send"}, status=status.HTTP_400_BAD_REQUEST)
        if not user_prompt:
            return Response({"error": "Missing 'input' in request data."}, status=status.HTTP_400_BAD_REQUEST)
        
        name = metadata.get("name","Guset")
        user_uuid = metadata.get("user_uuid","")
        location = metadata.get("location","")
        tools = metadata.get("tools","")
        choose_note = metadata.get("choose_note",{})
        chat_session = metadata.get("chat-session",{})
        if choose_note:
            note_uuid = choose_note.get("note_uuid","no uuid")
        if not chat_session:
            return Response({"error": "Missing 'input' in request data."}, status=status.HTTP_400_BAD_REQUEST)
        chat_session_uuid = chat_session.get("uuid","no uuid pass")
            # more staf here 
        clear_prompt = f"You are a AI Assemant in MemoEthiopia answer user quertion simple way  user prompt is {user_prompt} "        

        try:
            result = agent_executor.invoke({"input": clear_prompt})
            return Response({"response": result.get("output", "")}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)