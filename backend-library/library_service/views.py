from django.shortcuts import render

# Create your views here.
# Осуществляет прием запросана Добавление/Удаление/Изменение книги
class BookManager:
    def get(self,request):
        pass
    def put(self,request):
        pass
    def post(self,request):
        pass
    def delete(self,request):
        pass
    
# Осуществляет прием запросана Добавление/Удаление/Изменение читателя
class ReaderManager:
    def get(self,request):
        pass
    def put(self,request):
        pass
    def post(self,request):
        pass
    def delete(self,request):
        pass
    
# Создание и изменение факта выдачи/взятия книги.
class BookEventManager:
    def get(self,request):
        pass
    def put(self,request):
        pass
    def post(self,request):
        pass
    
# Отчет по читателю(Сколько брал, сколько на руках, дата последнего посещения, любимый жанр)
class ReaderReport:
    def get(self,request):
        pass
    
# Статистика по библиотеке(Самый читаемый автор, самый предпочтительный жанр) 
class LibraryReport:
    def get(self,request):
        pass
    
# Отчет по книге(ее нахождение, в наличии/не в наличии)
class BookReport:
    def get(self,request):
        pass
    
# Отчет о долгах
class DebtReport:
    def get(self,request):
        pass
    