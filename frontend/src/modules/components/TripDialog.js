import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {createNewItem, requestTransaction} from "../../services/apiService";
import {useNavigate} from "react-router-dom";
import {grey} from "@mui/material/colors";
import Container from "@mui/material/Container";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const TripDialog = ({trip, open, onClose}) => {
    const navigate = useNavigate();
    const [itemFormData, setItemFormData] = useState({
        description: '',
        size: '',
        weight: '',
    });
    const [itemId, setItemId] = useState(undefined);
    const [isSubmittingItem, setIsSubmittingItem] = useState(false);
    const [isItemSubmitted, setIsItemSubmitted] = useState(false);

    const areFieldsNotEmpty = itemFormData.description && itemFormData.size && itemFormData.weight;

    const handleChange = (e) => {
        setItemFormData({...itemFormData, [e.target.name]: e.target.value});
    };

    const handleCreateItem = async (e) => {
        e.preventDefault();
        setIsSubmittingItem(true);
        try {
            const res = await createNewItem(itemFormData);
            setItemId(res.id);
            setIsItemSubmitted(true);
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmittingItem(false);
        }
    };

    const handleReset = () => {
        setItemFormData({
            description: '',
            size: '',
            weight: '',
        });
        setIsItemSubmitted(false);
    };

    const handleRequestTransaction = async () => {
        try {
            await requestTransaction({
                "trip_id": trip.id,
                "item_id": itemId
            });
            navigate('/');
        } catch (error) {
            alert(`Transaction Error: ${error.message}`);
        }
    };

    const InfoItem = ({icon, children}) => (
        <Grid container alignItems="center" spacing={1}>
            <Grid item>{icon}</Grid>
            <Grid item>{children}</Grid>
        </Grid>
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Request a Trip</DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom variant="h6" component="div">
                    Trip Details
                </Typography>
                <Paper variant="outlined" sx={{p: 4, pb: 2, bgcolor: grey[50], my: 2}}>
                    <Grid container direction="column" spacing={2}>
                        <InfoItem icon={<LocationOnIcon color="primary"/>}>
                            <Typography>From: {trip.start_city}</Typography>
                        </InfoItem>
                        <InfoItem icon={<LocationOnIcon color="primary"/>}>
                            <Typography>To: {trip.end_city}</Typography>
                        </InfoItem>
                        <InfoItem icon={<EventIcon color="primary"/>}>
                            <Typography>Date: {trip.date}</Typography>
                        </InfoItem>
                        <InfoItem icon={<AttachMoneyIcon color="primary"/>}>
                            <Typography>Price: ${trip.price}</Typography>
                        </InfoItem>
                        <InfoItem icon={<PersonIcon color="primary"/>}>
                            <Typography>Provider: {trip.provider_surname} {trip.provider_lastname}</Typography>
                        </InfoItem>
                        <InfoItem icon={<PhoneIcon color="primary"/>}>
                            <Typography>Phone: {trip.provider_phone}</Typography>
                        </InfoItem>
                        <InfoItem icon={<EmailIcon color="primary"/>}>
                            <Typography>Email: {trip.provider_email}</Typography>
                        </InfoItem>
                    </Grid>
                </Paper>

                <Container sx={{p: 4, borderRadius: 1}}>
                    <Grid container spacing={0} alignItems="flex-end">
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div" gutterBottom>
                                Add an item
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <form onSubmit={handleCreateItem}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="description"
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={itemFormData.description}
                                            onChange={handleChange}
                                            disabled={isItemSubmitted}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="dense"
                                            name="size"
                                            label="Size"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={itemFormData.size}
                                            onChange={handleChange}
                                            disabled={isItemSubmitted}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            margin="dense"
                                            name="weight"
                                            label="Weight"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            value={itemFormData.weight}
                                            onChange={handleChange}
                                            disabled={isItemSubmitted}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DialogActions>
                                            <Button onClick={handleReset} color="secondary" disabled={isSubmittingItem}>
                                                Remove Item
                                            </Button>
                                            <Button type="submit" color="primary"
                                                    disabled={isSubmittingItem || !areFieldsNotEmpty || isItemSubmitted}>
                                                {isItemSubmitted ? 'Item Added' : 'Add Item'}
                                            </Button>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Back
                </Button>
                <Button onClick={handleRequestTransaction} color="primary" variant="contained"
                        disabled={!isItemSubmitted || isSubmittingItem}>
                    Request Transaction
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TripDialog;
