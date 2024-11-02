from django.contrib.auth.models import User
from django.db import models
import uuid

class Chat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chats")
    chat_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100, default="Untitled Chat")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat '{self.name}' for User {self.user.username}"

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    sender = models.CharField(max_length=10, choices=[("user", "User"), ("bot", "Bot")])
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message in Chat {self.chat.chat_id} by {self.sender}"