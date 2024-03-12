-- Insert dummy data into 'locations'
INSERT INTO locations (city_name) VALUES ('Berlin');
INSERT INTO locations (city_name) VALUES ('Frankfurt');
INSERT INTO locations (city_name) VALUES ('Hamburg');
INSERT INTO locations (city_name) VALUES ('Hannover');
INSERT INTO locations (city_name) VALUES ('London');

-- Insert dummy data into 'users'
INSERT INTO users (surname, lastname, phone_number, email, password) VALUES ('Smith', 'John', '1234567890', 'smith.john@example.com', 'password123');
INSERT INTO users (surname, lastname, phone_number, email, password) VALUES ('Doe', 'Jane', '0987654321', 'doe.jane@example.com', 'password123');
INSERT INTO users (surname, lastname, phone_number, email, password) VALUES ('Brown', 'Michael', '1112223333', 'brown.michael@example.com', 'password123');
INSERT INTO users (surname, lastname, phone_number, email, password) VALUES ('Davis', 'Jessica', '4445556666', 'davis.jessica@example.com', 'password123');
INSERT INTO users (surname, lastname, phone_number, email, password) VALUES ('Wilson', 'Emily', '7778889999', 'wilson.emily@example.com', 'password123');

-- Insert dummy data into 'trips'
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 1, 2, '2024-03-10T19:00', '15.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-10T20:00', '20.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 3, 4, '2024-03-10T08:30', '25.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 4, 5, '2024-03-10T12:00', '30.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 5, 1, '2024-03-10T16:00', '35.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 1, 2, '2024-03-10T16:00', '15.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 2, 3, '2024-03-10T16:00', '20.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 3, 5, '2024-03-10T16:00', '26.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 4, 1, '2024-03-10T16:00', '32.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 5, 2, '2024-03-10T16:00', '37.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 1, 4, '2024-03-03T07:30', '16.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 2, 5, '2024-03-03T11:30', '22.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 3, 1, '2024-03-03T13:00', '28.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 1, 2, '2024-03-04T18:00', '14.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-05T10:00', '19.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 3, 4, '2024-03-05T12:00', '23.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 4, 5, '2024-03-05T14:00', '27.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 4, 5, '2024-03-06T11:00', '24.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 5, 1, '2024-03-06T13:00', '28.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 1, 2, '2024-03-06T15:00', '12.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 2, 3, '2024-03-06T17:00', '16.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-07T08:00', '16.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 3, 4, '2024-03-07T10:30', '17.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 3, 4, '2024-03-08T11:15', '19.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 4, 5, '2024-03-08T13:30', '20.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 5, 1, '2024-03-08T15:45', '20.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 1, 2, '2024-03-09T18:00', '21.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-09T08:30', '21.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 3, 4, '2024-03-10T10:45', '22.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 4, 5, '2024-03-11T13:00', '22.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 5, 1, '2024-03-11T15:15', '23.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 1, 2, '2024-03-11T17:30', '23.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 3, 4, '2024-03-20T13:00', '25.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 4, 5, '2024-03-20T15:30', '10.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 5, 1, '2024-03-21T17:30', '15.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 1, 3, '2024-03-21T09:30', '15.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 2, 4, '2024-03-22T11:30', '21.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 4, 2, '2024-03-23T15:00', '34.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 5, 3, '2024-03-23T17:00', '11.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-23T10:00', '18.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 3, 4, '2024-03-24T12:00', '22.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 4, 5, '2024-03-24T14:00', '26.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 5, 1, '2024-03-24T16:00', '30.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 5, 1, '2024-03-25T16:00', '31.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 1, 2, '2024-03-25T18:00', '35.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 3, 4, '2024-03-26T09:00', '20.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 4, 5, '2024-03-27T12:45', '17.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 5, 1, '2024-03-28T14:00', '18.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 1, 2, '2024-03-29T16:20', '18.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 2, 3, '2024-03-30T09:00', '19.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 5, 1, '2024-03-20T12:30', '10.50', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 1, 2, '2024-03-15T08:00', '17.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (2, 1, 2, '2024-03-15T08:30', '12.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (3, 1, 2, '2024-03-15T13:00', '16.90', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (4, 3, 5, '2024-03-17T09:30', '10.00', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (5, 3, 5, '2024-03-17T10:00', '16.80', 1);
INSERT INTO trips (trip_provider, start_location, end_location, date, price, active) VALUES (1, 3, 5, '2024-03-17T10:30', '10.50', 1);



-- Insert dummy data into 'items'
INSERT INTO items (description, size, weight) VALUES ('Laptop', 'Medium', '2kg');
INSERT INTO items (description, size, weight) VALUES ('Backpack', 'Large', '1kg');
INSERT INTO items (description, size, weight) VALUES ('Guitar', 'Large', '5kg');
INSERT INTO items (description, size, weight) VALUES ('Bicycle', 'Extra Large', '10kg');
INSERT INTO items (description, size, weight) VALUES ('Book', 'Small', '0.5kg');

-- Insert dummy data into 'payments'
INSERT INTO payments (payment_method, credit_card_number) VALUES ('Visa', 1234567890123456);
INSERT INTO payments (payment_method, credit_card_number) VALUES ('MasterCard', 2345678901234567);
INSERT INTO payments (payment_method, credit_card_number) VALUES ('Visa', 3456789012345678);
INSERT INTO payments (payment_method, credit_card_number) VALUES ('Visa', 4567890123456789);
INSERT INTO payments (payment_method, credit_card_number) VALUES ('MasterCard', 5678901234567890);

-- Insert dummy data into 'transactions'
INSERT INTO transactions (trip, buyer, item, state) VALUES (1, 2, 3, 1);
INSERT INTO transactions (trip, buyer, item, state) VALUES (2, 3, 4, 0);
INSERT INTO transactions (trip, buyer, item, state) VALUES (3, 4, 5, 1);
INSERT INTO transactions (trip, buyer, item, state) VALUES (4, 5, 1, 0);
INSERT INTO transactions (trip, buyer, item, state) VALUES (5, 1, 2, 2);