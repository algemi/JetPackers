const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

const userService = require("./services/userService");
const adminController = require("./controllers/adminController");
const userController = require("./controllers/userController");
const tripController = require("./controllers/tripController");
const bookingController = require("./controllers/bookingController");

app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Parse application/json
app.use(bodyParser.json());

// Middleware function to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({error: "Unauthorized: Token not provided"});
    }
    userService.verifyToken(token, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: "Unauthorized: Invalid token"});
        }
        req.user = decoded;
        next();
    });
};


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Admin routes
app.get("/admin/createDb", adminController.createDb);
app.get("/admin/createDummyData", adminController.createDummyData);

// User routes
app.get("/user", authenticateToken, userController.getUserDara);
app.post("/user/register", userController.registerUser);
app.post("/user/login", userController.loginUser);
app.post("/user/payment", authenticateToken, userController.addPaymentMethod);

// Trips routes
app.get("/trips", tripController.searchForTrips);
app.post("/trips", authenticateToken, tripController.provideTrip);
app.delete("/trips", authenticateToken, tripController.deactivateTrip);
app.get("/trips/provided", authenticateToken, tripController.getTripsAsProvider);
app.get("/trips/locations", tripController.getLocations);

// Booking routes
app.get("/bookings", authenticateToken, bookingController.getBookingsAsUser);
app.post("/bookings", authenticateToken, bookingController.createBooking);
app.post("/bookings/items", authenticateToken, bookingController.createNewItem);
app.get("/bookings/requests", authenticateToken, bookingController.getBookingsAsTripProvider);
app.post("/bookings/requests", authenticateToken, bookingController.setBookingStateAsTripProvider);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
