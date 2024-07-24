from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
# Create your views here.
# Осуществляет прием запросана Добавление/Удаление/Изменение книги(Обработаем запросы на get,put,post.delete)
class BookManager(APIView):
    #Получаю лист кортежей со всеми записями
    def get(self, request):
        pass
    #Отправляю JSON с именем автора, метод должен его обработать и создать новую запись в таблице 
    def put(self, request):
        pass
    def post(self, request):
        pass
    def delete(self, request):
        pass
    
class AuthorManager(APIView):
    #Получаю лист кортежей со всеми записями
    def get(self, request):
        authors_serializer = AuthorsSerializer()
        author_list = authors_serializer.get_author_list()
        return Response(author_list)
    
    #Отправляю JSON с именем автора, метод должен его обработать и создать новую запись в таблице 
    def put(self, request):
        author_name = request.data.get('author_name', None)
        if author_name:
            authors_serializer = AuthorsSerializer()
            result = authors_serializer.add_author(author_name)
            return Response(result)
        else:
            return Response("Author name missing", status=status.HTTP_400_BAD_REQUEST)
        
    #Отправляю JSON с именем автора и его id на изменение.
    def post(self, request):
        author_id = request.data.get('author_id', None)
        author_name = request.data.get('author_name', None)
        if author_id and author_name:
            authors_serializer = AuthorsSerializer()
            result = authors_serializer.change_author(author_id, author_name)
            return Response(result)
        else:
            return Response("Author ID or name missing", status=status.HTTP_400_BAD_REQUEST)
        
    
    def delete(self, request):
        author_id = request.data.get('author_id', None)
        if author_id:
            authors_serializer = AuthorsSerializer()
            result = authors_serializer.delete_author(author_id)
            return Response(result)
        else:
            return Response("Author ID missing", status=status.HTTP_400_BAD_REQUEST)
    
# Осуществляет прием запросана Добавление/Удаление/Изменение читателя
class ReaderManager(APIView):
    def get(self,request):
        pass
    def put(self,request):
        pass
    def post(self,request):
        pass
    def delete(self,request):
        pass
    
# Создание и изменение факта выдачи/взятия книги.
class BookEventManager(APIView):
    def get(self,request):
        pass
    def put(self,request):
        pass
    def post(self,request):
        pass
    
# Отчет по читателю(Сколько брал, сколько на руках, дата последнего посещения, любимый жанр)
class ReaderReport(APIView):
    def get(self,request):
        pass
    
# Статистика по библиотеке(Самый читаемый автор, самый предпочтительный жанр) 
class LibraryReport(APIView):
    def get(self,request):
        pass
    
# Отчет по книге(ее нахождение, в наличии/не в наличии)
class BookReport(APIView):
    def get(self,request):
        pass
    
# Отчет о долгах
class DebtReport(APIView):
    def get(self,request):
        pass
    