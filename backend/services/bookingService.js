const repository = require("../db/database");


const BookingState = {
    Pending: 0,
    Approved: 1,
    Rejected: 2
}

const createNewItem = (description, size, weight, callback) => {
    const sql = `
        INSERT INTO items (description, size, weight)
        VALUES (?, ?, ?)
    `;
    const params = [description, size, weight];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {id: result.lastID, message: 'New item created successfully'});
        }
    });
};

const createBooking = (tripId, buyerId, itemId, callback) => {
    const sql = `
        INSERT INTO transactions (trip, buyer, item, state)
        VALUES (?, ?, ?, ?)
    `;
    const approvedValue = BookingState.Pending;
    const params = [tripId, buyerId, itemId, approvedValue];
    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {id: result.lastID, message: 'New booking created successfully'});
        }
    });
};

const getBookingsAsUser = (userId, callback) => {
    const sql = `
        SELECT transactions.id          AS transaction_id,
               transactions.trip        AS trip_id,
               start_location.city_name AS start_city,
               end_location.city_name   AS end_city,
               transactions.item        AS item_id,
               transactions.state,
               users.surname            AS provider_surname,
               users.lastname           AS provider_lastname,
               users.email              AS provider_email,
               users.phone_number       AS provider_phone,
               trips.date               AS trip_date,
               trips.price              AS trip_price,
               items.description        AS item_description,
               items.size               AS item_size,
               items.weight             AS item_weight
        FROM transactions
                 INNER JOIN
             trips ON transactions.trip = trips.id
                 INNER JOIN
             users ON trips.trip_provider = users.id
                 INNER JOIN
             items ON transactions.item = items.id
                 INNER JOIN
             locations AS start_location ON trips.start_location = start_location.id
                 INNER JOIN
             locations AS end_location ON trips.end_location = end_location.id
        WHERE transactions.buyer = ?
        ORDER BY trips.date DESC
    `;
    const params = [userId];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

const getBookingsAsTripProvider = (userId, tripId, callback) => {
    const sql = `
        SELECT transactions.id          AS transaction_id,
               transactions.trip        AS trip_id,
               start_location.city_name AS start_city,
               end_location.city_name   AS end_city,
               transactions.buyer       AS buyer_id,
               transactions.item        AS item_id,
               transactions.state,
               trips.date               AS trip_date,
               trips.price              AS trip_price,
               users.surname            AS buyer_surname,
               users.lastname           AS buyer_lastname,
               users.email              AS buyer_email,
               users.phone_number       AS buyer_phone,
               items.description        AS item_description,
               items.size               AS item_size,
               items.weight             AS item_weight
        FROM transactions
                 INNER JOIN
             trips ON transactions.trip = trips.id
                 INNER JOIN
             users ON transactions.buyer = users.id
                 INNER JOIN
             items ON transactions.item = items.id
                 INNER JOIN
             locations AS start_location ON trips.start_location = start_location.id
                 INNER JOIN
             locations AS end_location ON trips.end_location = end_location.id
        WHERE trips.id = ?
          AND trips.trip_provider = ?
        ORDER BY trips.date DESC
    `;
    const params = [tripId, userId];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


const setBookingStateAsTripProvider = (userId, bookingId, state, callback) => {
    const verifySql = `
        SELECT trips.trip_provider
        FROM transactions
                 INNER JOIN trips ON transactions.trip = trips.id
        WHERE transactions.id = ?
    `;
    const verifyParams = [bookingId];

    repository.executeSelectQuery(verifySql, verifyParams, (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        if (rows.length === 0) {
            callback(new Error("Transaction not found."), null);
            return;
        }
        if (rows[0]["trip_provider"] !== userId) {
            callback(new Error("User is not authorized to update this transaction."), null);
            return;
        }

        const updateSql = `
            UPDATE transactions
            SET state = ?
            WHERE id = ?
        `;
        const updateParams = [state, bookingId];

        repository.executeInsertUpdateDeleteQuery(updateSql, updateParams, (updateErr, result) => {
            if (updateErr) {
                callback(updateErr, null);
            } else {
                callback(null, {message: 'Booking state updated successfully', booking: result});
            }
        });
    });
};


module.exports = {
    createNewItem,
    createBooking,
    getBookingsAsUser,
    getBookingsAsTripProvider,
    setBookingStateAsTripProvider
};