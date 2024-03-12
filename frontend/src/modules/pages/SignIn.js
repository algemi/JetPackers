import React, {useState} from 'react';
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import {loginUser} from "../../services/apiService";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const user = await loginUser(email, password);
            handleLoginSuccess(user);
        } catch (error) {
            handleLoginError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();
    const handleLoginSuccess = (userData) => {
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
        navigate('/');
    };

    const handleLoginError = (loginError) => {
        console.error('Sign-in error:', loginError);
        alert('Sign-In failed: ' + (loginError.message || 'Please try again.'));
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
                    Sign In
                </Typography>
                <form onSubmit={handleLogin} noValidate>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{mt: 3, mb: 2}}
                    >
                        {isLoading ? <CircularProgress size={24}/> : 'Login'}
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default SignIn;