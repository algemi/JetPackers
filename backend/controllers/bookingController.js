const bookingService = require("../services/bookingService");

const createNewItem = (req, res) => {
    const {description, size, weight} = req.body;
    bookingService.createNewItem(description, size, weight, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const createBooking = (req, res) => {
    const {trip_id, item_id} = req.body;
    bookingService.createBooking(trip_id, req.user.id, item_id, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const getBookingsAsUser = (req, res) => {
    bookingService.getBookingsAsUser(req.user.id, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const getBookingsAsTripProvider = (req, res) => {
    const {trip} = req.query;
    bookingService.getBookingsAsTripProvider(req.user.id, trip, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const setBookingStateAsTripProvider = (req, res) => {
    const {booking_id, state} = req.body;
    bookingService.setBookingStateAsTripProvider(req.user.id, booking_id, state, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

module.exports = {
    createNewItem,
    createBooking,
    getBookingsAsUser,
    getBookingsAsTripProvider,
    setBookingStateAsTripProvider
};