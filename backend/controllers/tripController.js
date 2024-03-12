const tripService = require("../services/tripService");

const provideTrip = (req, res) => {
    const {start_location, end_location, date, price} = req.body;
    tripService.createTrip(req.user.id, start_location, end_location, date, price, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const deactivateTrip = (req, res) => {
    const {tripId} = req.query;
    tripService.deactivateTrip(tripId, req.user.id, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const getTripsAsProvider = (req, res) => {
    tripService.getUserTripsAsProvider(req.user.id, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const getLocations = (req, res) => {
    tripService.getLocations((err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}

const searchForTrips = (req, res) => {
    const {from, to, date} = req.query;
    tripService.searchForTrips(from, to, date, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}


module.exports = {
    getLocations,
    searchForTrips,
    provideTrip,
    deactivateTrip,
    getTripsAsProvider
};