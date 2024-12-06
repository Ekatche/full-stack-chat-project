from django.db.models import Count
from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Category, Server
from .schema import server_list_docs
from .serializer import CategorySerializer, ServerSerializer


class CategoryListViewset(viewsets.ViewSet):
    queryset = Category.objects.all()

    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serializer = CategorySerializer(self.queryset, many=True)
        return Response(serializer.data)


class ServerListViewSet(viewsets.ViewSet):

    queryset = Server.objects.all()
    # permission_classes = [IsAuthenticated]

    @server_list_docs
    def list(self, request):
        """
        Retrieves a list of servers based on provided query parameters and filters.

        Args:
            request (Request): The HTTP request object containing query parameters to filter the list of servers.
                - category (str, optional): Filter servers by category name.
                - qty (str, optional): Limit the number of servers returned.
                - by_user (str, optional): If "true", filter by the requesting user's membership.
                - by_server_id (str, optional): Filter by a specific server ID.
                - with_num_members (str, optional): If "true", include the number of members for each server.

        Raises:
            AuthenticationFailed: If `by_user` or `by_server_id` is requested without an authenticated user.
            ValidationError: If `by_server_id` does not match any server or is invalid.

        Returns:
            Response: A serialized list of servers, possibly filtered by category, user, server ID, or limited in quantity.
        """

        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # if by_user or by_server_id and not request.user.is_authenticated:
        #     raise AuthenticationFailed()

        if category:
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        if qty:
            self.queryset = self.queryset[: int(qty)]

        if by_server_id:
            if by_user and request.user.is_authenticated:
                try:
                    self.queryset = self.queryset.filter(id=by_server_id)
                    if not self.queryset.exists():
                        raise ValidationError(
                            details=f"Server with id {by_server_id} not found"
                        )
                except ValueError:
                    raise ValidationError(details="Server value error")
            else:
                raise AuthenticationFailed()

        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
