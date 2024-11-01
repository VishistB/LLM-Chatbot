from django.contrib import admin
from .models import Chat, Message

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'chat_id', 'created_at')
    search_fields = ('user__username', 'chat_id')
    list_filter = ('created_at',)
    ordering = ('-created_at',)

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'chat', 'sender', 'content', 'timestamp')
    search_fields = ('chat__chat_id', 'sender')
    list_filter = ('timestamp', 'sender')
    ordering = ('-timestamp',)
