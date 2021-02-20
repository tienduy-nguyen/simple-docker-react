CREATE TABLE IF NOT EXISTS users
( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    email TEXT  NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT,
    birthdate TEXT NOT NULL ,
    street TEXT NOT NULL  ,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    zip TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT,
    updatedAt TEXT,
    CONSTRAINT email_unique UNIQUE (email)
);