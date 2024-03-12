import React from 'react';
import {Container, Typography, Box} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function InfoContainer({text}) {
    return (
        <Container>
            <Box
                bgcolor="grey.200"
                p={2}
                display="flex"
                borderRadius={1}
            >
                <InfoIcon color="action"/>
                <Box marginLeft={1} dangerouslySetInnerHTML={{ __html: text }} />
            </Box>
        </Container>
    );
}

export default InfoContainer;