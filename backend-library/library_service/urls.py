from django.urls import path, include, re_path
from .views import (
    BookManager, AuthorManager, ReaderManager, BookEventManager,
    ReaderReport, LibraryReport, BookReport, DebtReport
)

urlpatterns = [
    path('book-manager/', BookManager.as_view(), name='book_manager'),
    path('reader-manager/', ReaderManager.as_view(), name='reader_manager'),
    path('author-manager/', AuthorManager.as_view(), name='author_manager'),
    path('book-event-manager/', BookEventManager.as_view(), name='book_event_manager'),
    path('reader-report/', ReaderReport.as_view(), name='reader_report'),
    path('library-report/', LibraryReport.as_view(), name='library_report'),
    path('book-report/', BookReport.as_view(), name='book_report'),
    path('debt-report/', DebtReport.as_view(), name='debt_report'),
]