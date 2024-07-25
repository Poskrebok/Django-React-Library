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
        books_serializer = BookSerializer()
        book_list = books_serializer.get_books()
        return Response(book_list)
    
    #Добавить книгу 
    def put(self, request):
        book_title = request.data.get('book_title',None)
        genre_id = request.data.get('genre_id',None)
        author_id = request.data.get('author_id',None)
        books_serializer = BookSerializer()
        
        if book_title and genre_id and author_id:
            books_serializer.add_book([book_title,genre_id,author_id])
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to create a book", status=status.HTTP_400_BAD_REQUEST)
        
    #Изменить книгу
    def post(self, request):
        book_id = request.data.get('id', None)
        book_title = request.data.get('book_title', None)
        genre_id = request.data.get('genre_id', None)
        author_id = request.data.get('author_id', None)
        books_serializer = BookSerializer()
        
        if book_id and book_title and genre_id and author_id:
            books_serializer.update_book(book_id, book_title, genre_id, author_id)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to update the book", status=status.HTTP_400_BAD_REQUEST)
    #Удалить книгу
    def delete(self, request):
        book_id = request.data.get('id', None)
        books_serializer = BookSerializer()
        
        if book_id:
            books_serializer.remove_book(book_id)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing book ID to delete", status=status.HTTP_400_BAD_REQUEST)
    
class AuthorManager(APIView):
    #Получаю лист кортежей со всеми записями
    def get(self, request):
        authors_serializer = AuthorsSerializer()
        author_list = authors_serializer.get_author_list()
        return Response(author_list)
    
    #Добавить автора
    def put(self, request):
        author_name = request.data.get('author_name', None)
        if author_name:
            authors_serializer = AuthorsSerializer()
            authors_serializer.add_author(author_name)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Author name missing", status=status.HTTP_400_BAD_REQUEST)
        
    #Изменить автора
    def post(self, request):
        author_id = request.data.get('author_id', None)
        author_name = request.data.get('author_name', None)
        if author_id and author_name:
            authors_serializer = AuthorsSerializer()
            authors_serializer.change_author(author_id, author_name)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Author ID or name missing", status=status.HTTP_400_BAD_REQUEST)
        
    
    def delete(self, request):
        author_id = request.data.get('author_id', None)
        if author_id:
            authors_serializer = AuthorsSerializer()
            authors_serializer.delete_author(author_id)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Author ID missing", status=status.HTTP_400_BAD_REQUEST)
    
# Осуществляет прием запросана Добавление/Удаление/Изменение читателя
class ReaderManager(APIView):
    #Получить список читателей.
    def get(self, request):
        reader_serializer = ReaderSerializer()
        reader_list = reader_serializer.get_readers()
        return Response(reader_list)
    
    #Создать читателя.
    def put(self, request):
        reader_name = request.data.get('reader_name', None)
        address = request.data.get('address', None)  
        reader_serializer = ReaderSerializer()
        
        if reader_name and address:
            reader_serializer.add_reader(reader_name, address)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to create a reader", status=status.HTTP_400_BAD_REQUEST)
    
    #Обновить читателя.
    def post(self, request):
        reader_id = request.data.get('id', None)
        reader_name = request.data.get('reader_name', None)
        address = request.data.get('address', None)  
        reader_serializer = ReaderSerializer()
        
        if reader_id and reader_name and address:
            reader_serializer.change_reader(reader_id, reader_name, address)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to update the reader", status=status.HTTP_400_BAD_REQUEST)
    
    #Удалить читателя.
    def delete(self, request):
        reader_id = request.data.get('id', None)
        reader_serializer = ReaderSerializer()
        
        if reader_id:
            reader_serializer.delete_reader(id)
            return Response("Reader deleted successfully")
        else:
            return Response("Missing reader ID to delete", status=status.HTTP_400_BAD_REQUEST)
    
# Создание и изменение факта выдачи/взятия книги.
class BookEventManager(APIView):
    # Взять все события
    def get(self, request):
        events_serializer = EventsSerializer()
        event_list = events_serializer.get_events()
        return Response(event_list)
    
    # Добавить новые события(выдать книгу, т.е.)
    def put(self, request):
        book_id = request.data.get('book_id', None)
        reader_id = request.data.get('reader_id', None)
        transaction_date = request.data.get('transaction_date', None)
        transaction_return = request.data.get('transaction_return', None)
        transaction_expected_return = request.data.get('transaction_expected_return', None)
        events_serializer = EventsSerializer()
        
        if all([book_id, reader_id, transaction_date, transaction_expected_return]):
            result = events_serializer.add_event(book_id, reader_id, transaction_date, transaction_expected_return)
            return Response(result)
        else:
            return Response("Missing data to add an event", status=status.HTTP_400_BAD_REQUEST)
    
    # Закрыть событие
    def post(self, request):
        event_id = request.data.get('id', None)
        events_serializer = EventsSerializer()
        
        if event_id:
            result = events_serializer.close_event(event_id)
            return Response(result)
        else:
            return Response("Missing event ID to close the event", status=status.HTTP_400_BAD_REQUEST)
    
# Отчеты
class Reports(APIView):
    #report_type - это тип отчета, что мы хотим посмотреть.
    def get(self,request):
        report_type = request.data.get('report_type',None)
        return self.switch[report_type]()
    
    def get_genres(self,request):
        report_serializer = ReportSerializer()
        author_list = report_serializer.getMostPopularGenres()
        return Response(author_list)
    
    def get_authors(self,request):
        report_serializer = ReportSerializer()
        author_list = report_serializer.getMostPopularAuthors()
        return Response(author_list)
    
    def get_events(self,request):
        report_serializer = ReportSerializer()
        event_list = report_serializer.get_non_closed_events()
        return Response(event_list)
    
    def debt_events(self,request):
        report_serializer = ReportSerializer()
        event_list = report_serializer.get_outdated_non_closed_events()
        return Response(event_list)
    
    switch = {
        "popGenres": get_genres,
        "popAuthor": get_authors,
        "activeEvents": get_events,
        "debtEvents": debt_events
    }
    
# Получить/обновить список жанров
class GenresManager(APIView):
    # Получить список жанров.
    def get(self,request):
        genre_serializer = GenresSerializer()
        genre_list = genre_serializer.get_genres()
        return Response(genre_list)
    
    def put(self,request):
        title = request.data.get('genre',None)
        genre_serializer = GenresSerializer()
        if title:
            genre_serializer.add_genre(title)
            return Response("Succes",status=status.HTTP_200_OK)
    