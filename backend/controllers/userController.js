const userService = require("../services/userService");

const getUserDara = (req, res) => {
    userService.getUserDara(req.user.id, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
};

const registerUser = (req, res) => {
    const {surname, lastname, phone_number, email, password} = req.body;
    userService.registerUser(surname, lastname, phone_number, email, password, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
};

const loginUser = (req, res) => {
    const {email, password} = req.body;
    userService.loginUser(email, password, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
};

const addPaymentMethod = (req, res) => {
    const {payment_method, credit_card_number} = req.body;
    userService.addPaymentMethod(req.user.id, payment_method, credit_card_number, (err, result) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
};


module.exports = {
    getUserDara,
    registerUser,
    loginUser,
    addPaymentMethod
};
