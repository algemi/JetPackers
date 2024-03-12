import React, {useEffect, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {
    deactivateProvidedTrip,
    getLocations,
    getProvidedTrips,
    getUserDataFromLocalStorage,
    offerTrip
} from "../../services/apiService";
import {useNavigate} from "react-router-dom";
import InfoContainer from "../components/InfoContainer";

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [isSignedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        start_location: '',
        end_location: '',
        date: '',
        price: ''
    });
    const [locations, setLocations] = useState([]);
    const areFieldsNotEmpty = formData.start_location && formData.end_location && formData.date && formData.price;


    const fetchTrips = async () => {
        try {
            const data = await getProvidedTrips();
            setTrips(data);
        } catch (error) {
            console.error('Failed to fetch trips:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            const data = await getLocations();
            setLocations(data);
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        }
    };

    useEffect(() => {
        const isSignedIn = getUserDataFromLocalStorage() != null;
        if (isSignedIn) {
            fetchTrips();
            fetchLocations();
            setSignedIn(true);
        } else {
            navigate("/signup");
        }
    }, []);

    const handleSetState = async (tripId) => {
        try {
            await deactivateProvidedTrip(tripId);
            fetchTrips();
        } catch (error) {
            console.error('Failed to set transaction state:', error);
        }
    };

    const handleRequestsNavigation = (tripId) => {
        navigate(`/requests?trip=${tripId}`);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCreateTrip = async () => {
        const tripData = {
            start_location: parseInt(formData.start_location),
            end_location: parseInt(formData.end_location),
            date: formData.date,
            price: formData.price
        };

        await offerTrip(tripData);
        fetchTrips();
        handleClose();
    };

    const infoText = `
    This is the central hub where you can manage all the trips you're offering. Here's a quick guide to help you navigate the page:
    <p>
      Click <strong>"Offer A New Trip"</strong> to create a new listing.
      Each trip in your list has options to <strong>"Deactivate Trip"</strong>, preventing new requests,
      and <strong>"View Requests"</strong> to manage user requests for that trip.
    </p>
    <p>
      Deactivated trips will no longer accept new user requests, but you can still see past requests.
    </p>`

    return isSignedIn ? (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                My Provided Trips
            </Typography>
            <InfoContainer text={infoText} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                sx={{mb: 2}}>
                Offer A New Trip
            </Button>
            <Paper elevation={2}>
                <List>
                    {trips.map((trip) => (
                        <ListItem key={trip.transaction_id} divider>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="subtitle1" component="h3">
                                            {trip.date}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Start: {trip.start_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Destination : {trip.end_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Price: {trip.price}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Trip Active For Requests: {trip.active === 1 ? "Yes" : "No"}
                                        </Typography>

                                        <ButtonGroup size="small" aria-label="transaction state actions">
                                            {trip.active === 1 && ( // Show action buttons only for 'Pending' state transactions
                                                <Button
                                                    color="primary"
                                                    onClick={() => handleSetState(trip.id)}
                                                >
                                                    Deactivate Trip
                                                </Button>
                                            )}
                                            <Button
                                                color="secondary"
                                                onClick={() => handleRequestsNavigation(trip.id)}
                                            >
                                                View Requests
                                            </Button>
                                        </ButtonGroup>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Offer A New Trip</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="start-location-label">Start Location</InputLabel>
                        <Select
                            labelId="start-location-label"
                            id="start-location"
                            name="start_location"
                            value={formData.start_location}
                            label="Start Location"
                            onChange={handleInputChange}
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.city_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="end-location-label">End Location</InputLabel>
                        <Select
                            labelId="end-location-label"
                            id="end-location"
                            name="end_location"
                            value={formData.end_location}
                            label="End Location"
                            onChange={handleInputChange}
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.city_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Date and Time"
                        type="datetime-local"
                        fullWidth
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="text"
                        fullWidth
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateTrip} disabled={!areFieldsNotEmpty} color="primary">
                        Offer A New Trip
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    ) : null;
};

export default Trips;