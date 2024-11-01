from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='get_sender_display') 

    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp']
        read_only_fields = ['id', 'timestamp']


class ChatSerializer(serializers.ModelSerializer):
    chat_id = serializers.UUIDField(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['id', 'chat_id', 'created_at', 'messages']
        read_only_fields = ['id', 'chat_id', 'created_at']
