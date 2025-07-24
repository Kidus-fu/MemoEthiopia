from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .AIAgent import agent_executor
from .tools import create_note_tool
from rest_framework.permissions import IsAuthenticated
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


class CreateNoteAgentView(APIView):
    permission_classes  = [IsAuthenticated]
    def post(self, request):
        user_prompt = request.data.get("user_prompt")
        metadata = request.data.get("metadata", {})

        if not user_prompt:
            return Response({"error": "user_prompt is required."}, status=status.HTTP_400_BAD_REQUEST)
        user_id = metadata.get("user_id")
        folder_id = metadata.get("folder_id")

        if not user_id:
            return Response({"error": "user_id in metadata is required."}, status=status.HTTP_400_BAD_REQUEST)
        input_data = {
            "user_id": user_id,
            "user_prompt": user_prompt,
            "folder_id":folder_id
        }

        try:
            markdown_note = create_note_tool.func(input_data)

            return Response({"created_note_md": markdown_note}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LangChainAgentView(APIView):
    def post(self, request):
        user_prompt = request.data.get("user_prompt", "")
        metadata = request.data.get("metadata", {})

        # Validation
        if not metadata:
            return Response({"error": "metadata is required."}, status=status.HTTP_400_BAD_REQUEST)
        if not user_prompt:
            return Response({"error": "user_prompt is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Extract metadata safely
        name = metadata.get("name", "Guest")
        user_uuid = metadata.get("user_uuid", "")
        location = metadata.get("location", "")
        tools = metadata.get("tools", "")
        choose_note = metadata.get("choose_note", {})
        chat_session = metadata.get("chat_session", {})  # fix key naming

        if not chat_session:
            return Response({"error": "chat_session is required in metadata."}, status=status.HTTP_400_BAD_REQUEST)

        note_uuid = choose_note.get("note_uuid", "no uuid") if choose_note else None
        chat_session_uuid = chat_session.get("uuid", "no uuid passed")

        # Build clear prompt
        clear_prompt = (
            f"You are an AI Assistant in MemoEthiopia. Answer the user's question simply.\n"
            f"User Prompt: {user_prompt}\n"
            f"User UUID: {user_uuid}\n"
            f"Note UUID: {note_uuid}\n"
            f"Location: {location}\n"
            f"Tools: {tools}\n"
            f"Chat Session UUID: {chat_session_uuid}"
        )

        try:
            result = agent_executor.invoke({"input": clear_prompt})
            return Response({"response": result.get("output", "")}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)