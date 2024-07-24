from rest_framework import serializers
from django.db import connection
import datetime

from .models import *

def execute_query(sql_query,param = None):
    with connection.cursor() as cursor:
        cursor.execute(sql_query,param)
        result = cursor.fetchall()
    return result

#Класс обрабатывающий запросы к тблице авторов в бд.
class AuthorsSerializer:
        
    def get_author_list(self):
        sql_query = "SELECT * FROM Authors"
        result = execute_query(sql_query)
        return result
        
    def add_author(self,author_name):
        sql_query = "INSERT INTO Authors (author_name) VALUES (%s)"
        param = [author_name]
        result = execute_query(sql_query,param)
        return result
    
    def delete_author(self,id):
        sql_query = "DELET FROM Authors WHERE id = %s"
        param = [id]
        result = execute_query(sql_query,param)
        return result
        
    def change_author(self,id,author_name):
        sql_query = "UPDATE Authors SET author_name = %s WHERE id = %s"
        param = [author_name, id]
        result = execute_query(sql_query,param)
        return result
    
class GenresSerializer:
    
    def get_genres(self):
        sql_query = "SELECT * FROM Genres"
        result = execute_query(sql_query)
        return result
    
    def add_genre(self,genre):
        sql_query = "INSERT INTO Genres (title) value (%s)"
        param = [genre]
        result = execute_query(sql_query,param)
        return result
        
class ReaderSerializer:
    
    def get_readers(self):
        sql_query = "SELECT * FROM Readers"
        result = execute_query(sql_query)
        return result
    
    #reader должен иметь имя, и geoJSON.
    def add_reader(self,*reader):
        sql_query = "INSERT INTO Reader (reader_name,adress) VALUES (%s,%s)"
        param = reader
        result = execute_query(sql_query,param)
        return result
    
    def change_reader(self,id,*reader):
        sql_query = "UPDATE Reader SET reader_name = %s,adress = %s WHERE id = %s"
        param = list(reader)
        param.append(id)
        result = execute_query(sql_query,param)
        return result
   
class BookSerializer:
    
    def get_books(self):
        sql_query = "SELECT * FROM Books"
        result = execute_query(sql_query)
        return result
    
    def add_book(self,*book):
        sql_query = "INSERT INTO Books (book_title, genre_id, author_id) VALUES(%s,%s,%s)"
        param = book
        result = execute_query(sql_query,param)
        return result
    
    def update_book(self,id,*book):
        sql_query = "UPDATE Books SET book_title = %s, genre_id = %s, author_id = %s WHERE id = %s"
        param = list(book)
        param.append(id)
        result = execute_query(sql_query,param)
        return result
    
    def remove_book(self,id):
        sql_query = "DELETE FROM Books WHERE id = %s"
        param = [id]
        result = execute_query(sql_query,param)
        return result
    
class EventsSerializer:
    
    def get_events(self):
        sql_query = "SELECT * FROM Events"
        result = execute_query(sql_query)
        return result
    
    def add_event(self,*event):
        sql_query = "INSERT INTO Events(book, reader, transaction_date, transaction_return, transaction_expected_return) VALUES(%s,%s,%s,%s,%s) WHERE id = %s"
        param = event
        result = execute_query(sql_query,param)
        return result
        
    def close_event(self,id):
        sql_query = "UPDATE Events SET transaction_return = %s WHERE id = %s"
        current_timestamp = datetime.datetime.now()
        param = [current_timestamp,id]
        result = execute_query(sql_query,param)
        return result
    
    def get_non_closed_events(self):
        sql_query = "SELECT * FROM Events WHERE transaction_return = NULL"
        result = execute_query(sql_query)
        return result
    
    def get_outdated_non_closed_events(self):
        sql_query = "SELECT * FROM Events WHERE transaction_return = NULL AND transaction_expected_return < %s"
        current_timestamp = datetime.datetime.now()
        param = [current_timestamp]
        result = execute_query(sql_query,param)
        return result
    