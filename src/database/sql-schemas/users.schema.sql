CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NULL DEFAULT '',
  last_name TEXT NULL DEFAULT '',
  full_name TEXT DEFAULT '',
  birthdate TEXT NULL DEFAULT NULL,
  street TEXT NULL DEFAULT NULL,
  city TEXT NULL DEFAULT NULL,
  country TEXT NULL DEFAULT NULL,
  zip TEXT NULL DEFAULT NULL,
  status VARCHAR(6) CHECK(status IN ('ACTIVE', 'LOCKED', 'CLOSED')) NOT NULL DEFAULT 'ACTIVE',
  createdAt TEXT NULL DEFAULT NULL,
  updatedAt TEXT NULL DEFAULT NULL,
  CONSTRAINT email_unique UNIQUE (email)
);