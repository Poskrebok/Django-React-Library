
CREATE TABLE Authors (
  id SERIAL PRIMARY KEY,
  author_name VARCHAR(100) NOT NULL
);

CREATE TABLE Genres (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

CREATE TABLE Books (
  id SERIAL PRIMARY KEY,
  book_title VARCHAR(200) NOT NULL,
  genre_id INT NOT NULL,
  author_id INT NOT NULL,
  isReturned BOOL DEFAULT TRUE,
  FOREIGN KEY (author_id) REFERENCES Authors(id),
  FOREIGN KEY (genre_id) REFERENCES Genres(id)
);

CREATE TABLE Readers (
  id SERIAL PRIMARY KEY,
  reader_name VARCHAR(100) NOT NULL
);

CREATE TABLE Events (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL,
  reader_id INT NOT NULL,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  transaction_return TIMESTAMP,
  transaction_expected_return TIMESTAMP,
  FOREIGN KEY (book_id) REFERENCES Books(id),
  FOREIGN KEY (reader_id) REFERENCES Readers(id)
);