import React, {useState} from 'react';
import {Button, ButtonGroup, Container, Typography} from '@mui/material';
import {createSampleData, initDatabase} from '../../services/apiService';
import InfoContainer from "../components/InfoContainer";

const Admin = () => {
    const [dbInitStatus, setDbInitStatus] = useState('');
    const handleInitClick = () => {
        initDatabase()
            .then(data => {
                setDbInitStatus('Database initialized successfully.');
            })
            .catch(error => {
                setDbInitStatus('Error initializing database.');
            });
    };

    const [sampleDataStatus, setSampleDataStatus] = useState('');

    const handleCreateSampleDataClick = () => {
        createSampleData()
            .then(data => {
                setSampleDataStatus('Sample data created successfully.');
            })
            .catch(error => {
                setSampleDataStatus('Error creating sample data.');
            });
    };

    const infoText = `
    Use the buttons below with caution. These operations are intended for initial setup and maintenance of the application's database.
    <p><strong>Initialize Database</strong>: This button will create all the necessary database tables for this application. It should only be used once during the initial setup or when resetting the application to its default state.
    <p><strong>Load Sample Data</strong>: Press this button to populate the database with sample data. This operation should only be performed once to prevent duplicating entries. Ensure that the database is initialized before loading sample data.
    `

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                Admin
            </Typography>
            <InfoContainer text={infoText}/>
            <ButtonGroup size="small" aria-label="transaction state actions">
                <Button
                    color="primary"
                    onClick={() => handleInitClick()}
                >
                    Initialize Database
                </Button>
                {dbInitStatus}
                <Button
                    color="primary"
                    onClick={() => handleCreateSampleDataClick()}
                >
                    Load Sample Data
                </Button>
                {sampleDataStatus}
            </ButtonGroup>
        </Container>
    )
        ;
};

export default Admin;