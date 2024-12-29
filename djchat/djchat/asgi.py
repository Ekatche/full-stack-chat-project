"""
ASGI config for djchat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

# Set the default settings module for the Django project
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djchat.settings")

# Create the ASGI application for handling Django's HTTP requests
django_app = get_asgi_application()

# Import the URL patterns from the local `urls` module.
# The `# noqa isort:skip` comment ensures that linters or sorters do not rearrange this line.
from .urls import websockets_urlspatterns  # noqa isort:skip`

# Define a router for ASGI application, which directs traffic based on protocol type
router_definition = ProtocolTypeRouter(
    {
        # Route "http" protocol requests to the Django application
        "http": django_app,
        # Route "websocket" protocol requests to URLRouter with websocket URL patterns
        "websocket": URLRouter(websockets_urlspatterns),
    }
)

# Assign the protocol router definition to `application`
# This is the entry point for the ASGI server
application = router_definition
