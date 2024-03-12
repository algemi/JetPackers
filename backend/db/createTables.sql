CREATE TABLE locations
(
    id        INTEGER PRIMARY KEY,
    city_name TEXT
);

CREATE TABLE users
(
    id           INTEGER PRIMARY KEY,
    surname      TEXT NOT NULL,
    lastname     TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email        TEXT NOT NULL UNIQUE,
    password     TEXT NOT NULL,
    payment      INTEGER,
    FOREIGN KEY (payment) REFERENCES payments (id)
);

CREATE TABLE trips
(
    id             INTEGER PRIMARY KEY,
    trip_provider  INTEGER,
    start_location INTEGER,
    end_location   INTEGER,
    date           TEXT,
    price          TEXT,
    active         INTEGER,
    FOREIGN KEY (trip_provider) REFERENCES users (id),
    FOREIGN KEY (start_location) REFERENCES locations (id),
    FOREIGN KEY (end_location) REFERENCES locations (id)
);

CREATE TABLE items
(
    id          INTEGER PRIMARY KEY,
    description TEXT,
    size        TEXT,
    weight      TEXT
);

CREATE TABLE payments
(
    id                 INTEGER PRIMARY KEY,
    payment_method     TEXT,
    credit_card_number INTEGER
);

CREATE TABLE transactions
(
    id    INTEGER PRIMARY KEY,
    trip  INTEGER,
    buyer INTEGER,
    item  INTEGER,
    state INTEGER,
    FOREIGN KEY (trip) REFERENCES trips (id),
    FOREIGN KEY (buyer) REFERENCES users (id),
    FOREIGN KEY (item) REFERENCES items (id)
);