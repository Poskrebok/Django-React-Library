from django.db import connection
import datetime

from .models import *
#Все запросы к БД - здесь.

#Функция с запросом к бд, без ответного результата.(Если у нас отсутствует ответный результат, то выкидывается ошибка, 
# что создает некоторые проблемы при запросах, которые не должны ничего возвращать.)
def execute_query(sql_query,param = None):
    with connection.cursor() as cursor:
        try:
            cursor.execute(sql_query,param)
            return True
        except:
            return False

#Функция, которая возвращает результат запроса.
def execute_query_with_result(sql_query,param = None):
    with connection.cursor() as cursor:
        try:
            cursor.execute(sql_query,param)
            result = cursor.fetchall()
            return result
        except:
            return [(0)]
    

#Класс обрабатывающий запросы к тблице авторов в бд.
class AuthorsSerializer:
        
    def get_author_list(self):
        sql_query = "SELECT * FROM Authors"
        result = execute_query_with_result(sql_query)
        return result
        
    def add_author(self,author_name):
        sql_query = "INSERT INTO Authors (author_name) VALUES (%s)"
        param = [author_name]
        result = execute_query_with_result(sql_query,param)
        return result
    
    def delete_author(self,id):
        sql_query = "DELETE FROM Authors WHERE id = %s"
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
        result = execute_query_with_result(sql_query)
        return result
    
    def add_genre(self,genre):
        sql_query = "INSERT INTO Genres (title) value (%s)"
        param = [genre]
        result = execute_query_with_result(sql_query,param)
        return result
        
class ReaderSerializer:
    
    def get_readers(self):
        sql_query = "SELECT * FROM Readers"
        result = execute_query_with_result(sql_query)
        return result
    
    #reader должен иметь имя.
    def add_reader(self,reader):
        sql_query = "INSERT INTO Readers (reader_name,adress) VALUES (%s,%s)"
        param = reader
        result = execute_query(sql_query,param)
        return result
    
    def change_reader(self,id,reader):
        sql_query = "UPDATE Reader SET reader_name = %s,adress = %s WHERE id = %s"
        param = reader
        param.append(id)
        result = execute_query(sql_query,param)
        return result
        
    def delete_reader(self,id):
        sql_query = "DELET FROM Reader  WHERE id = %s"
        result = execute_query(sql_query)
        return result
        
 
class BookSerializer:
    
    def get_books(self):
        sql_query = "SELECT * FROM Books"
        result = execute_query_with_result(sql_query)
        return result
    
    def add_book(self,book):
        sql_query = "INSERT INTO Books (book_title, genre_id, author_id) VALUES(%s,%s,%s)"
        param = book
        result = execute_query(sql_query,param)
        return result
    
    def update_book(self,id,book):
        sql_query = "UPDATE Books SET book_title = %s, genre_id = %s, author_id = %s WHERE id = %s"
        param = book
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
        result = execute_query_with_result(sql_query)
        return result
    
    #нужно передавать (book_id, reader_id, transaction_expected_return)
    def add_event(self,event):
        sql_query = "BEGIN; INSERT INTO Events(book_id, reader_id, transaction_expected_return) VALUES(%s,%s,%s); UPDATE Books SET isReturned = FALSE WHERE id = %s; COMMIT;"
        param = event
        param.append(event[0])
        result = execute_query(sql_query,param)
        return result
    
    #Передаем только id    
    def close_event(self,id):
        sql_query = "BEGIN; UPDATE Events SET transaction_return = %s WHERE id = %s; UPDATE Books SET isReturned = TRUE WHERE id = (SELECT book_id FROM Events WHERE id = %s);  COMMIT;"
        current_timestamp = datetime.datetime.now()
        param = [current_timestamp,id,id]
        result = execute_query(sql_query,param)
        return result
       
class ReportSerializer:
    # Получить все незакрытые события
    def get_non_closed_events(self):
        sql_query = "SELECT * FROM Events WHERE transaction_return IS NULL"
        result = execute_query_with_result(sql_query)
        return result
    
    # Получить все незакрытые просроченные события
    def get_outdated_non_closed_events(self):
        sql_query = "SELECT * FROM Events WHERE transaction_return IS NULL AND transaction_expected_return < %s"
        current_timestamp = datetime.datetime.now()
        param = [current_timestamp]
        result = execute_query_with_result(sql_query,param)
        return result
    
    # Получить список жанров по популярности
    def getMostPopularGenres(self):
        sql_query = "SELECT title, count(title) FROM Genres JOIN Books ON Genres.id = Books.genre_id JOIN Events ON Books.id = Events.book_id group by title ORDER BY COUNT(title) DESC;"
        result = execute_query_with_result(sql_query)
        return result 
    
    #Получить список авторов по популярности
    def getMostPopularAuthors(self):
        sql_query = "SELECT author_name, count(Authors.id) FROM Authors JOIN Books ON Books.author_id = Authors.id JOIN Events ON Events.book_id = books.id group by (Authors.id) ORDER BY COUNT(Authors.id) DESC;"
        result = execute_query_with_result(sql_query)
        return result 
    
    #Получить список книг по популярности(не используется)
    def getMostPopularBooks(self):
        sql_query = "SELECT Books.book_title, count(Events.book_id) FROM Books RIGHT JOIN Events ON Books.id = Events.book_id GROUP BY book_title"
        result = execute_query_with_result(sql_query)
        return result 
    
    #Получить статистику по читателю.
    def getReaderProfileData(self,reader_id):
        param = [reader_id]
        sql_query_taken = "SELECT Count(*) FROM Events WHERE reader_id = %s"
        sql_query_debt = "SELECT Count(*) FROM Events WHERE reader_id = %s AND transaction_return = NULL"
        sql_query_last_visit = "SELECT GREATEST(transaction_date, transaction_return) AS latest_date FROM (SELECT * FROM events WHERE reader_id = %s);"
        sql_query_favorite_genre = "SELECT title, count(title) FROM Genres JOIN Books ON Genres.id = Books.genre_id JOIN Events ON Books.id = Events.book_id  WHERE reader_id = %s group by title ORDER BY COUNT(title) DESC;"
        result = []
        result.append(execute_query_with_result(sql_query_taken,param))
        result.append(execute_query_with_result(sql_query_debt,param))
        result.append(execute_query_with_result(sql_query_last_visit,param))
        result.append(execute_query_with_result(sql_query_favorite_genre,param))
        return result
        