import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from './modules/components/Button';
import Typography from './modules/components/Typography';
import {
    Box,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    ListItemIcon,
    MenuItem,
    Paper,
    Select
} from '@mui/material';
import BasicDatePicker from './modules/components/Datepicker';
import {useNavigate} from 'react-router-dom';
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SendIcon from '@mui/icons-material/Send';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PeopleIcon from '@mui/icons-material/People';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

export default function App() {
    const [locations, setLocations] = useState([]);
    const [location1, setLocation1] = useState('');
    const [location2, setLocation2] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8080/trips/locations');
                setLocations(response.data);
            } catch (error) {
            }
        };
        fetchLocations();
    }, []);

    const changeLocation1 = (event) => {
        setLocation1(event.target.value);
    };
    const changeLocation2 = (event) => {
        setLocation2(event.target.value);
    };

    const changeDate = (event) => {
        setDate(dayjs(event).format("YYYY-MM-DD"));
    }

    useEffect(() => {
        setSearchDisabled(checkForm());
    }, [location1, location2, date]);

    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/booking?from=${location1}&to=${location2}&date=${date}`);
    };

    const checkForm = () => {
        return location1 === '' || location2 === '' || date === '';
    }

    const [isSearchDisabled, setSearchDisabled] = useState(true);

    const InfoCard = ({icon, title, description}) => {
        return (
            <Paper elevation={3}>
                <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box mb={1}>{icon}</Box>
                    <Typography variant="h5" component="h3" gutterBottom align="center">
                        {title}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {description}
                    </Typography>
                </Box>
            </Paper>
        );
    };

    return (
        <Container maxWidth="md">
            <div className="App"
                 sxBackground={{
                     backgroundColor: '#7fc7d9',
                     backgroundPosition: 'center',
                 }}
            >
                <Typography color="inherit" align="center" variant="h4" marked="center">
                    Carry-On a Difference with Jetpackers – Deliver as You Discover.
                </Typography>
                <Typography
                    color="inherit"
                    align="center"
                    variant="h5"
                    sx={{mb: 4, mt: {xs: 4, sm: 10}}}
                >
                    Find your next delivery:
                </Typography>
                <FormControl fullWidth sx={{mb: 4}}>
                    <InputLabel id="location1-label">Start Location</InputLabel>
                    <Select
                        labelId="location1-label"
                        id="location1-select"
                        value={location1}
                        label="Location1"
                        onChange={changeLocation1}
                    >
                        {locations.map((location) => (
                            <MenuItem key={location.id} value={location.id}>
                                {location.city_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{mb: 4}}>
                    <InputLabel id="location2-label">End Location</InputLabel>
                    <Select
                        labelId="location2-label"
                        id="location2-select"
                        value={location2}
                        label="Location2"
                        onChange={changeLocation2}
                    >
                        {locations.map((location) => (
                            <MenuItem key={location.id} value={location.id}>
                                {location.city_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <BasicDatePicker onChange={changeDate}/>
                <Button
                    size="large"
                    variant="contained"
                    component="a"
                    sx={{mt: 8, background:"#D5B02B"}}
                    onClick={handleSearch}
                    disabled={isSearchDisabled}
                >
                    Search
                </Button>
                <Typography variant="body2" color="inherit" sx={{mt: 2}}>
                    Click, Pack, Deliver.
                </Typography>
            </div>
            <Divider sx={{mb: 4, mt: 4}}/>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<LocalShippingIcon/>}
                        title="How It Works"
                        description="Post your item delivery request and connect with users who are heading in the same direction."
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<SendIcon/>}
                        title="For Senders"
                        description="Post your delivery needs and our community of users will help you transport your items efficiently."
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <InfoCard
                        icon={<CardTravelIcon/>}
                        title="For Travelers"
                        description="Traveling soon? Why not help deliver an item along the way and earn extra cash?"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <VerifiedUserIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Trust & Safety"
                                              secondary="We ensure all users are verified and provide secure payment methods."/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Community Driven"
                                              secondary="Be part of a community that believes in sharing resources and mutual assistance."/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <PlayCircleFilledIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Get Started"
                                              secondary="Sign up today and start sharing or requesting deliveries easily."/>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}