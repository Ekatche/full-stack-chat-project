"""
We can think of a consumer as a Python class that handles incoming messages and produces outgoing messages
in a WebSocket connection or other supported protocol. 
So it acts as the main logic handler for communication between the server and the client.
"""

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class WebChatConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = "test_server"

    def connect(self):
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
        self.accept()

    def receive_json(self, content=None):
        message = content["message"]
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                "type": "chat.message",
                "new_message": message,
            },
        )

    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        # Called when the socket closes
        self.close()
