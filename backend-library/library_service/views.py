from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .dbconnections import *

#Декоратор, который ловит ошибки выполнения функций. 
def handle_exceptions(view_func):
    def wrapped_view(request, *args, **kwargs):
        try:
            return view_func(request, *args, **kwargs)
        except:
            return Response("Internal server error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return wrapped_view

# Осуществляет прием запросана Добавление/Удаление/Изменение книги(Обработаем запросы на get,put,post.delete)
class BookManager(APIView):
    #Получаю лист кортежей со всеми записями
    @handle_exceptions
    def get(self, request):
        books_serializer = BookSerializer()
        book_list = books_serializer.get_books()
        return Response(book_list)
    
    #Добавить книгу 
    @handle_exceptions
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
    @handle_exceptions
    def post(self, request):
        book_id = request.data.get('id', None)
        book_title = request.data.get('book_title', None)
        genre_id = request.data.get('genre_id', None)
        author_id = request.data.get('author_id', None)
        books_serializer = BookSerializer()
        
        if book_id and book_title and genre_id and author_id:
            books_serializer.update_book(book_id, [book_title, genre_id, author_id])
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to update the book", status=status.HTTP_400_BAD_REQUEST)
    #Удалить книгу
    @handle_exceptions
    def delete(self, request):
        book_id = request.data.get('id', None)
        books_serializer = BookSerializer()
        
        if book_id:
            books_serializer.remove_book(book_id)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing book ID to delete", status=status.HTTP_400_BAD_REQUEST)
        
# Осуществляет прием запросана Добавление/Удаление/Изменение автора
class AuthorManager(APIView):
    #Получаю лист кортежей со всеми записями
    @handle_exceptions
    def get(self, request):
        authors_serializer = AuthorsSerializer()
        author_list = authors_serializer.get_author_list()
        return Response(author_list)
    
    #Добавить автора
    @handle_exceptions
    def put(self, request):
        author_name = request.data.get('author_name', None)
        if author_name:
            authors_serializer = AuthorsSerializer()
            authors_serializer.add_author(author_name)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Author name missing", status=status.HTTP_400_BAD_REQUEST)
        
    #Изменить автора
    @handle_exceptions
    def post(self, request):
        author_id = request.data.get('author_id', None)
        author_name = request.data.get('author_name', None)
        if author_id and author_name:
            authors_serializer = AuthorsSerializer()
            authors_serializer.change_author(author_id, author_name)
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Author ID or name missing", status=status.HTTP_400_BAD_REQUEST)
        
    #Удалить автора
    @handle_exceptions
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
    @handle_exceptions
    def get(self, request):
        reader_serializer = ReaderSerializer()
        reader_list = reader_serializer.get_readers()
        return Response(reader_list)
    
    #Создать читателя.
    @handle_exceptions
    def put(self, request):
        reader_name = request.data.get('reader_name', None)
        address = request.data.get('address', None)  
        reader_serializer = ReaderSerializer()
        #Проверяю только имя, т.к. на адресс(geoJSON) не хватило времени.
        if reader_name:
            reader_serializer.add_reader([reader_name, address])
            return Response("Succes",status=status.HTTP_200_OK)
        else:
            return Response("Missing data to create a reader", status=status.HTTP_400_BAD_REQUEST)
    
    #Обновить читателя.
    @handle_exceptions
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
    @handle_exceptions
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
    @handle_exceptions
    def get(self, request):
        events_serializer = EventsSerializer()
        event_list = events_serializer.get_events()
        return Response(event_list)
    
    # Добавить новые события(выдать книгу, т.е.)
    @handle_exceptions
    def put(self, request):
        book_id = request.data.get('book_id', None)
        reader_id = request.data.get('reader_id', None)
        transaction_expected_return = request.data.get('transaction_expected_return', None)
        events_serializer = EventsSerializer()
        
        if all([book_id, reader_id, transaction_expected_return]):
            result = events_serializer.add_event([book_id, reader_id, transaction_expected_return])
            return Response(result)
        else:
            return Response("Missing data to add an event", status=status.HTTP_400_BAD_REQUEST)
    
    # Закрыть событие
    @handle_exceptions
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
    @handle_exceptions
    def get(self, request, report_type):
        funct = self.switch.get(report_type)
        result = funct(self)
        return result
    
    #Получить список по популярности жанров
    @handle_exceptions
    def get_genres(self):
        report_serializer = ReportSerializer()
        author_list = report_serializer.getMostPopularGenres()
        return Response(author_list)
    
    #Получить список по популярности авторов.
    @handle_exceptions
    def get_authors(self):
        report_serializer = ReportSerializer()
        author_list = report_serializer.getMostPopularAuthors()
        return Response(author_list)
    
    #Получить список событий
    @handle_exceptions
    def get_events(self):
        report_serializer = ReportSerializer()
        event_list = report_serializer.get_non_closed_events()
        return Response(event_list)
    
    #Получить список событий(Просроченых)
    @handle_exceptions
    def debt_events(self):
        report_serializer = ReportSerializer()
        event_list = report_serializer.get_outdated_non_closed_events()
        return Response(event_list)
    
    #Case Switch
    switch = {
        'popGenres': get_genres,
        'popAuthor': get_authors,
        'activeEvents': get_events,
        'debtEvents': debt_events
    }
    
# Получить/обновить список жанров
class GenresManager(APIView):
    # Получить список жанров.
    @handle_exceptions
    def get(self,request):
        genre_serializer = GenresSerializer()
        genre_list = genre_serializer.get_genres()
        return Response(genre_list)
    
    # Добавить жанр.
    @handle_exceptions
    def put(self,request):
        title = request.data.get('genre',None)
        genre_serializer = GenresSerializer()
        if title:
            genre_serializer.add_genre(title)
            return Response("Succes",status=status.HTTP_200_OK)

#Класс, который возвращает данные по конкретному читателю.
class ReaderProfile(APIView):
    @handle_exceptions
    def get(self, request, reader_id):
        report_serializer = ReportSerializer()
        result = report_serializer.getReaderProfileData(reader_id)
        return Response(result)
    