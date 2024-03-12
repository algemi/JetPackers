import React from 'react';
import {Button, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {deleteUserDataFromLocalStorage} from "../../services/apiService";

const SignOut = () => {

    deleteUserDataFromLocalStorage();

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
                    Signed Out
                </Typography>
                <Link to="/">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        To Homepage
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default SignOut;