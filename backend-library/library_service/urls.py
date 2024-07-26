from django.urls import path, include, re_path
from .views import *

urlpatterns = [
    path('book-manager/', BookManager.as_view(), name='book_manager'),
    path('reader-manager/', ReaderManager.as_view(), name='reader_manager'),
    path('author-manager/', AuthorManager.as_view(), name='author_manager'),
    path('genre-manager/', GenresManager.as_view(), name='genre_manager'),
    path('book-event-manager/', BookEventManager.as_view(), name='book_event_manager'),
    path('reports/', Reports.as_view(), name='reports'),
    path('reader-profile/',ReaderProfile.as_view, name='reader_profile'),
]