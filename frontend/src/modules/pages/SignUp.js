import React, {useState} from 'react';
import {Box, Button, CircularProgress, Container, TextField, Typography} from '@mui/material';
import {signUpUser} from "../../services/apiService";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        surname: '',
        lastname: '',
        phoneNumber: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const areFieldsNotEmpty = formData.email && formData.password && formData.confirmPassword && formData.surname && formData.lastname && formData.phoneNumber;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            onSignUpError('Passwords do not match.');
            return;
        }
        setIsLoading(true);
        try {
            const user = await signUpUser(formData);
            onSignUpSuccess(user);
        } catch (error) {
            onSignUpError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();
    const onSignUpSuccess = (userData) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    const onSignUpError = (error) => {
        console.error('Sign-up error:', error);
        alert('Sign-up failed: ' + (error.message || 'Please try again later.'));
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Surname"
                        name="surname"
                        autoFocus
                        value={formData.surname}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Lastname"
                        name="lastname"
                        autoFocus
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        autoFocus
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading || !areFieldsNotEmpty}
                        sx={{mt: 3, mb: 2}}
                    >
                        {isLoading ? <CircularProgress size={24}/> : 'Sign Up'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;