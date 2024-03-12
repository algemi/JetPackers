import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {getUserData, updateUserPayment} from "../../services/apiService";


const UserProfile = ({userId}) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserData(userId);
                setUserData(data);
                setPaymentMethod(data.payment_method);
                setCreditCardNumber(data.credit_card_number);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handlePaymentUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedPaymentData = await updateUserPayment({
                payment_method: paymentMethod,
                credit_card_number: creditCardNumber
            });
            setUserData({...userData, ...updatedPaymentData});
        } catch (updateError) {
            setError(updateError.message);
        }
    };

    const areFieldsNotEmpty = paymentMethod && creditCardNumber

    if (loading) {
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

    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">User Profile</Typography>
                    <Typography color="textSecondary">Surname: {userData.surname}</Typography>
                    <Typography color="textSecondary">Lastname: {userData.lastname}</Typography>
                    <Typography color="textSecondary">Phone Number: {userData.phone_number}</Typography>
                    <Typography color="textSecondary">Email: {userData.email}</Typography>

                    <form onSubmit={handlePaymentUpdate}>

                        <FormControl fullWidth margin="normal" variant="outlined">
                            <InputLabel id="payment-method-label">Payment Method</InputLabel>
                            <Select
                                labelId="payment-method-label"
                                id="payment-method"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                label="Payment Method"
                            >
                                <MenuItem value="VISA">VISA</MenuItem>
                                <MenuItem value="MASTER CARD">MASTERCARD</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Credit Card Number"
                            variant="outlined"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)}
                            fullWidth
                            margin="normal"
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                        />
                        <Button type="submit"
                                disabled={!areFieldsNotEmpty}
                                variant="contained"
                                color="primary"
                                style={{marginTop: '16px'}}>
                            Update Payment Method
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserProfile;