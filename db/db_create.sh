#!/bin/bash

DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="library"
DB_USER="postgres"

export PGPASSWORD='1'

# Drop 
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "DROP DATABASE $DB_NAME;"

# Create 
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Connect 
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f schema.sql