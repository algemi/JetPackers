const jwt = require('jsonwebtoken');
const repository = require("../db/database");

const SECRET_KEY = 'your_secret_key';


const getUserDara = (id, callback) => {
    const sql = `SELECT u.id, u.surname, u.lastname, u.phone_number, u.email, p.payment_method, p.credit_card_number
                 FROM users u
                          LEFT JOIN payments p ON u.payment = p.id
                 WHERE u.id = ?`;
    const params = [id];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            if (rows.length > 0) {
                const user = rows[0];
                callback(null, {user});
            } else {
                callback(null, null);
            }
        }
    });
};

const registerUser = (surname, lastname, phone_number, email, password, callback) => {
    const sql = "INSERT INTO users (surname, lastname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
    const params = [surname, lastname, phone_number, email, password];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            const token = generateToken(email);
            callback(null, {token});
        }
    });
};

const loginUser = (email, password, callback) => {
    const sql = "SELECT id, surname, lastname, phone_number, email FROM users WHERE email = ? AND password = ?";
    const params = [email, password];

    repository.executeSelectQuery(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            if (rows.length > 0) {
                const user = rows[0];
                const token = generateToken(user.id, user.email);
                callback(null, {token, user: user});
            } else {
                callback(null, null);
            }
        }
    });
};

const addPaymentMethod = (userId, payment_method, credit_card_number, callback) => {
    const sql = "INSERT INTO payments (payment_method, credit_card_number) VALUES (?, ?)";
    const params = [payment_method, credit_card_number];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            const paymentId = result.lastID;
            linkPaymentToUser(userId, paymentId, (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    });
};

const linkPaymentToUser = (userId, paymentId, callback) => {
    const sql = "UPDATE users SET payment = ? WHERE id = ?";
    const params = [paymentId, userId];

    repository.executeInsertUpdateDeleteQuery(sql, params, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const generateToken = (id, email) => {
    return jwt.sign({id: id, email: email}, SECRET_KEY, {expiresIn: '365d'});
};

const verifyToken = (token, callback) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, decoded);
        }
    });
};

module.exports = {
    getUserDara,
    registerUser,
    loginUser,
    verifyToken,
    addPaymentMethod
};
