import React, {useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Container, Paper, Typography} from '@mui/material';
import TripDialog from "../components/TripDialog";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getTrips, getUserDataFromLocalStorage} from "../../services/apiService";
import InfoContainer from "../components/InfoContainer";

const BookingComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const tripData = await getTrips({from: from, to: to, date: date});
                setTrips(tripData);
            } catch (fetchError) {
                setError(fetchError.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const handleCardClick = (trip) => {
        const isSignedIn = getUserDataFromLocalStorage() != null;
        if (isSignedIn) {
            setSelectedTrip(trip); // Set the selected trip
        } else {
            navigate("/signup");
        }
    };

    const handleCloseDialog = () => {
        setSelectedTrip(null); // Clear the selected trip
    };

    if (isLoading) {
        return (
            <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error" variant="h6">Error: {error}</Typography>
            </Container>
        );
    }

    const infoText = `Explore a curated list of trips that match your search criteria. Click on a trip for detailed information, including trip provider details, and submit your delivery request!`

    return (
        <Container maxWidth="md">
            <InfoContainer text={infoText}/>
            {trips.length === 0 && (
                <Paper elevation={2}>
                    <Typography variant="subtitle1" sx={{p: 2}}> No Trips found :(</Typography>
                </Paper>
            )}
            {trips.map((trip) => (
                <Card key={trip.id} sx={{marginBottom: 2}} onClick={() => handleCardClick(trip)}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {trip.start_city} to {trip.end_city}
                        </Typography>
                        <Typography color="textSecondary">
                            Date: {trip.date}
                        </Typography>
                        <Typography color="textSecondary">
                            Price: ${trip.price}
                        </Typography>
                        <Typography gutterBottom variant="body1">
                            Provider: {trip.provider_surname} {trip.provider_lastname}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            {selectedTrip && (
                <TripDialog trip={selectedTrip} open={Boolean(selectedTrip)} onClose={handleCloseDialog}/>
            )}
        </Container>
    );
};

export default BookingComponent;