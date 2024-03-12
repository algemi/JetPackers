const repository = require("../db/database");


const createTrip = (tripProvider, startLocation, endLocation, date, price, callback) => {
    const sql = `
        INSERT INTO trips (trip_provider, start_location, end_location, date, price, active)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [tripProvider, startLocation, endLocation, date, price, 1];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, {tripId: result.lastID});
        }
    });
};

const deactivateTrip = (tripId, tripProvider, callback) => {
    const sql = `
        UPDATE trips
        SET active = 0
        WHERE id = ?
          AND trip_provider = ?
    `;
    const params = [tripId, tripProvider];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            if (result.changes > 0) {
                callback(null, {tripId, message: 'Trip deactivated successfully'});
            } else {
                callback(null, {tripId, message: 'Trip not found or already deactivated'});
            }
        }
    });
};

const getUserTripsAsProvider = (userId, callback) => {
    const sql = `
        SELECT trips.id,
               trips.date,
               trips.price,
               start_location.city_name AS start_city,
               end_location.city_name   AS end_city,
               trips.active
        FROM trips
                 INNER JOIN
             locations AS start_location ON trips.start_location = start_location.id
                 INNER JOIN
             locations AS end_location ON trips.end_location = end_location.id
        WHERE trips.trip_provider = ?
    `;
    const params = [userId];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const getLocations = (callback) => {
    const sql = "SELECT *FROM locations";

    repository.executeSelectQuery(sql, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


const searchForTrips = (from, to, date, callback) => {
    let sql = `
        SELECT trips.id,
               trips.date,
               trips.price,
               start_location.city_name AS start_city,
               end_location.city_name   AS end_city,
               users.id                 AS provider_id,
               users.surname            AS provider_surname,
               users.lastname           AS provider_lastname,
               users.phone_number       AS provider_phone,
               users.email              AS provider_email
        FROM trips
                 INNER JOIN
             users ON trips.trip_provider = users.id
                 INNER JOIN
             locations AS start_location ON trips.start_location = start_location.id
                 INNER JOIN
             locations AS end_location ON trips.end_location = end_location.id
        WHERE DATE(trips.date) = DATE(?)
          AND trips.start_location = ?
          AND trips.end_location = ?
          AND trips.active = 1
    `;
    let params = [date, from, to];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}


module.exports = {
    getLocations,
    searchForTrips,
    createTrip,
    deactivateTrip,
    getUserTripsAsProvider
};