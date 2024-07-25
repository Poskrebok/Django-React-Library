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