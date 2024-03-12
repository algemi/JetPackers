import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Container, List, ListItem, ListItemText, Paper, Typography} from '@mui/material';
import {getTransactionRequests, setTransactionState} from "../../services/apiService";
import StateChip from "./StateChip";
import {useSearchParams} from "react-router-dom";
import InfoContainer from "./InfoContainer";

const TransactionRequests = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [transactionRequests, setTransactionRequests] = useState([]);
    const tripId = searchParams.get("trip");

    useEffect(() => {
        fetchTransactionRequests();
    }, []);

    const fetchTransactionRequests = async () => {
        try {
            const data = await getTransactionRequests(tripId);
            setTransactionRequests(data);
        } catch (error) {
            console.error('Failed to fetch transaction requests:', error);
        }
    };

    const handleSetState = async (transactionId, newState) => {
        try {
            const response = await setTransactionState({booking_id: transactionId, state: newState});
            if (response.booking) {
                fetchTransactionRequests();
            } else {
                console.error('Failed to set transaction state');
            }
        } catch (error) {
            console.error('Failed to set transaction state:', error);
        }
    };

    const infoText = `
    Below you'll find a list of all user requests for your trips. Each request includes detailed information and can be managed individually.
    <p>
        Each request is initially in a pending state. You can review the details and choose to either <strong>Accept</strong> or <strong>Reject</strong> the request by clicking the corresponding buttons.
    </p>`

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                Trip Requests
            </Typography>
            <InfoContainer text={infoText}/>
            <Paper elevation={2}>
                {transactionRequests.length === 0 && (
                    <Typography variant="subtitle1" sx={{p: 2}}> No Trip Requests available </Typography>)}
                <List>
                    {transactionRequests.map((request) => (
                        <ListItem key={request.transaction_id} divider>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="subtitle1" component="h3">
                                            Transaction ID: {request.transaction_id} <StateChip state={request.state}/>
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Start: {request.start_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Destination : {request.end_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Date: {request.trip_date}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Price: ${request.trip_price}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="subtitle1" component="h3">
                                            Requester Information
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Surname: {request.buyer_surname}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Lastname: {request.buyer_lastname}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Email: {request.buyer_email}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Phone: {request.buyer_phone}
                                        </Typography>
                                        <Typography variant="subtitle1" component="h3">
                                            Item Information
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Description: {request.item_description}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Size: {request.item_size}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Weight: {request.item_weight}
                                        </Typography>
                                        {request.state === 0 && ( // Show action buttons only for 'Pending' state transactions
                                            <ButtonGroup size="small" aria-label="transaction state actions">
                                                <Button
                                                    color="accept"
                                                    onClick={() => handleSetState(request.transaction_id, 1)}
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    color="reject"
                                                    onClick={() => handleSetState(request.transaction_id, 2)}
                                                >
                                                    Reject
                                                </Button>
                                            </ButtonGroup>
                                        )}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default TransactionRequests;