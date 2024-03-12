import React, {useEffect, useState} from 'react';
import {List, ListItem, ListItemText, Typography, Paper, Container} from '@mui/material';
import {getUserDataFromLocalStorage, getUserTransactions} from "../../services/apiService";
import StateChip from "../components/StateChip";
import {useNavigate} from "react-router-dom";
import InfoContainer from "../components/InfoContainer";

const UserTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [isSignedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getUserTransactions();
                setTransactions(data);
            } catch (error) {
            }
        };

        const isSignedIn = getUserDataFromLocalStorage() != null;
        if (isSignedIn) {
            fetchTransactions();
            setSignedIn(true);
        } else {
            navigate("/signup");
        }
    }, []);

    const infoText = `
    Welcome to "My Requested Trips" – your personal dashboard for keeping track and to manage your trip requests and stay up-to-date with the status of each.
    Here's what you can do on this page:
    <p><strong>Review Your Requests</strong>: Browse through the list of trips you've requested to join. Each entry provides you with the essential details of the trip, including the start location, destination, date, and price, as well as the status of your request (pending, accepted, or rejected).</p>
    <p><strong>Manage Request Details</strong>: Stay informed about any updates to your requested trips. You'll have access to the trip organizer's contact information, should you need to reach out for further information or make specific arrangements.</p>
    <p><strong>Track Request Status</strong>: Keep an eye on the progress of your requests. When a trip organizer reviews your request, the status will update accordingly. You'll be able to see at a glance which requests have been accepted, allowing you to start planning, and which are still pending review.</p>
    `

    return  isSignedIn ? (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                My Requested Trips
            </Typography>
            <InfoContainer text={infoText} />
            <Paper elevation={2}>
                <List>
                    {transactions.map((transaction) => (
                        <ListItem key={transaction.transaction_id} divider>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="subtitle1" component="h3">
                                            Transaction ID: {transaction.transaction_id} <StateChip
                                            state={transaction.state}/>
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Start: {transaction.start_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Destination : {transaction.end_city}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Date: {transaction.trip_date}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Price: ${transaction.trip_price}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="subtitle1" component="h3">
                                            Provider Information
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Surname: {transaction.provider_surname}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Lastname: {transaction.provider_lastname}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Email: {transaction.provider_email}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Phone: {transaction.provider_phone}
                                        </Typography>

                                        <Typography variant="subtitle1" component="h3">
                                            Item Information
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Description: {transaction.item_description}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Size: {transaction.item_size}
                                        </Typography>
                                        <Typography component="p" variant="body2">
                                            Weight: {transaction.item_weight}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    ): null;
};

export default UserTransactions;