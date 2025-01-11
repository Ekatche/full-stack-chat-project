from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Conversation, Message
from .schema import list_message_docs
from .serializers import MessageSerializer

# Create your views here.


class MessageViewset(viewsets.ViewSet):

    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            message = conversation.messages.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])
