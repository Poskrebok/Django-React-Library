-- Insert data into the reader table
INSERT INTO Readers (reader_name)
VALUES ('Alice'),
       ('Bob'),
       ('Charlie');

-- Insert data into the authors table
INSERT INTO Authors (author_name)
VALUES ('Author A'),
       ('Author B'),
       ('Author C');

-- Insert data into the genres table
INSERT INTO Genres (title)
VALUES ('Fiction'),
       ('Non-Fiction'),
       ('Mystery');

DO $$ 
DECLARE
    i INT := 1;
BEGIN
    WHILE i <= 100 LOOP
        INSERT INTO public.Books (book_title, author_id, genre_id, isReturned)
        VALUES (
            'Book ' || i,
            (i % 3) + 1,  -- Assign author_id cyclically among 3 authors
            (i % 3) + 1,  -- Assign genre_id cyclically among 3 genres
            true    -- Assign isreturned alternating between TRUE and FALSE
        );
        i := i + 1;
    END LOOP;
END $$;


BEGIN; 
INSERT INTO Events(book_id, reader_id, transaction_expected_return)
 VALUES(1,1,'2024-07-26 15:30:00'); 
 UPDATE Books SET isReturned = FALSE 
 WHERE id = 1; 
 COMMIT;

 BEGIN; 
INSERT INTO Events(book_id, reader_id, transaction_expected_return)
 VALUES(2,1,'2024-07-28 15:30:00'); 
 UPDATE Books SET isReturned = FALSE 
 WHERE id = 2; 
 COMMIT;

  BEGIN; 
INSERT INTO Events(book_id, reader_id, transaction_expected_return)
 VALUES(3,2,'2024-07-28 15:30:00'); 
 UPDATE Books SET isReturned = FALSE 
 WHERE id = 3; 
 COMMIT;