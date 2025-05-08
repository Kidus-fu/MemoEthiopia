from rest_framework import serializers
from .models import ChatSession, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    # Write-only input for POST
    session_id = serializers.PrimaryKeyRelatedField(
        queryset=ChatSession.objects.all(), write_only=True
    )

    # Read-only output
    session = serializers.SerializerMethodField()

    class Meta:
        model = ChatMessage
        fields = ['session_id', 'session', 'id', 'sender', 'message', 'timestamp', 'tool_used','token_count']

    def get_session(self, obj):
        user = obj.session.user
        return {
            "uuid": obj.session.uuid,
            "user": {
                "username": user.username if user else None,
                "id": user.id if user else None,
                "email": user.email if user else None
            },
            "started_at": obj.session.started_at,
            "ended_at": obj.session.ended_at,
            "linked_note": obj.session.linked_note.id if obj.session.linked_note else None
        }

    def create(self, validated_data):
        session = validated_data.pop("session_id")
        return ChatMessage.objects.create(session=session, **validated_data)
class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['uuid', 'user', 'title', 'description', 'started_at', 'ended_at', 'linked_note', 'messages', 'is_active']