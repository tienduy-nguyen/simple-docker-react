CREATE TABLE IF NOT EXISTS user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  hasSubscribedToNewsletter INTEGER CHECK (hasSubscribedToNewsletter IN (0, 1)) NULL DEFAULT 0,
  defaultCurrency TEXT CHECK(defaultCurrency IN ('EUR', 'USD')) DEFAULT 'EUR',
  FOREIGN KEY (userId) REFERENCES users (id)
);