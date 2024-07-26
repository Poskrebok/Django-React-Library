from django.db import models

# Create your models here.
# Эти модели были созданы через "inspectdb > models.py". 
# По сути они нам не нужны, т.к. все запросы делаем через connection напряму в дб.
class Authors(models.Model):
    author_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'authors'


class Books(models.Model):
    book_title = models.CharField(max_length=200)
    genre = models.ForeignKey('Genres', models.DO_NOTHING)
    author = models.ForeignKey(Authors, models.DO_NOTHING)
    isreturned = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'books'


class Events(models.Model):
    book = models.ForeignKey(Books, models.DO_NOTHING)
    reader = models.ForeignKey('Readers', models.DO_NOTHING)
    transaction_date = models.DateTimeField(blank=True, null=True)
    transaction_return = models.DateTimeField(blank=True, null=True)
    transaction_expected_return = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'events'


class Genres(models.Model):
    title = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'genres'


class Readers(models.Model):
    reader_name = models.CharField(max_length=100)
    adress = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'readers'


class SpatialRefSys(models.Model):
    srid = models.IntegerField(primary_key=True)
    auth_name = models.CharField(max_length=256, blank=True, null=True)
    auth_srid = models.IntegerField(blank=True, null=True)
    srtext = models.CharField(max_length=2048, blank=True, null=True)
    proj4text = models.CharField(max_length=2048, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spatial_ref_sys'