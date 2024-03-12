import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }
    return token;
};

export const getUserDataFromLocalStorage = () => {
    const token = localStorage.getItem('user');
    if (!token) {
        console.warn('No user found in local storage.');
        return null;
    }
    return token;
};

export const deleteUserDataFromLocalStorage = () => {
    localStorage.clear();
};

export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('/user/login', {email: email, password: password});
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
    } catch (error) {
        throw error.response.data;
    }
};

export const signUpUser = async ({surname, lastname, phoneNumber, email, password}) => {
    try {
        const response = await apiClient.post('/user/register', {
            "surname": surname,
            "lastname": lastname,
            "phone_number": phoneNumber,
            "email": email,
            "password": password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred during sign-up');
    }
};

export const getUserData = async () => {
    try {
        const response = await apiClient.get("/user");
        return response.data.user;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while fetching user data');
    }
};

export const updateUserPayment = async (paymentData) => {
    try {
        const response = await apiClient.post(`/user/payment`, {
            ...paymentData
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const getLocations = async () => {
    try {
        const response = await apiClient.get('/trips/locations');
        return response.data; //returns the array of locations
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while fetching locations');
    }
};

export const getTrips = async ({from, to, date}) => {
    try {
        const queryParams = new URLSearchParams({from, to, date}).toString();
        const response = await fetch(`http://localhost:8080/trips?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let trips = await response.json();
        const user = JSON.parse(getUserDataFromLocalStorage());
        if (user != null){
            trips = trips.filter((trip) => trip.provider_id !== user.id);
        }
        return trips;
    } catch (error) {
        throw error;
    }
};

export const createNewItem = async (itemDetails) => {
    try {
        const response = await apiClient.post(`/bookings/items`, {
            ...itemDetails
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};


export const requestTransaction = async (transactionDetails) => {
    try {
        const response = await apiClient.post(`/bookings`, {
            ...transactionDetails
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const getUserTransactions = async () => {
    try {
        const response = await apiClient.get(`/bookings`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const getTransactionRequests = async (tripId) => {
    try {
        const response = await apiClient.get(`/bookings/requests?trip=${tripId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const setTransactionState = async (transactionDetails) => {
    try {
        const response = await apiClient.post(`/bookings/requests`, {
            ...transactionDetails
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const getProvidedTrips = async () => {
    try {
        const response = await apiClient.get(`/trips/provided`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const deactivateProvidedTrip = async (tripId) => {
    try {
        const response = await apiClient.delete(`/trips?tripId=${tripId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const offerTrip = async (tripDetails) => {
    try {
        const response = await apiClient.post(`/trips`, {
            ...tripDetails
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('An error occurred while updating payment information');
    }
};

export const initDatabase = async () => {
    try {
        const response = await axios.get('http://localhost:8080/admin/createDb');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSampleData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/admin/createDummyData');
        return response.data;
    } catch (error) {
        throw error;
    }
};

