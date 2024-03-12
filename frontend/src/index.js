import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './modules/pages/Layout';
import App from './App';
import Booking from './modules/pages/Booking';
import SignIn from './modules/pages/SignIn';
import Admin from './modules/pages/Admin';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./modules/pages/SignUp";
import Account from "./modules/pages/Account";
import Transactions from "./modules/pages/Transactions";
import TransactionRequests from "./modules/components/TransactionRequests";
import Trips from "./modules/pages/Trips";
import SignOut from "./modules/pages/SignOut";
import {ThemeProvider} from "@mui/material";
import theme from "./modules/theme";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<App/>}/>
                    <Route path="booking" element={<Booking/>}/>
                    <Route path="account" element={<Account/>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="signout" element={<SignOut/>}/>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="transactions" element={<Transactions/>}/>
                    <Route path="requests" element={<TransactionRequests/>}/>
                    <Route path="trips" element={<Trips/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>
);

reportWebVitals();
