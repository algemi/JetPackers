const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

let db;

const initDb = () => {
    if (!db) {
        db = new sqlite3.Database('./jetpackers.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
            if (err) {
                console.error("Error opening database:", err.message);
            } else {
                console.log("Database connected successfully");
                createTables();
            }
        });
    }
};

const createTables = () => {
    initDb();
    const filepath = path.join(__dirname, "createTables.sql");
    const query = fs.readFileSync(filepath).toString();

    db.exec(query, (err) => {
        if (err) {
            console.error("Error creating tables:", err.message);
        } else {
            console.log("Tables created successfully");
        }
    });
};

const insertInto = () => {
    initDb();
    const filepath = path.join(__dirname, "insertInto.sql");
    const query = fs.readFileSync(filepath).toString();

    db.exec(query, (err) => {
        if (err) {
            console.error("Error inserting data:", err.message);
        } else {
            console.log("Data inserted successfully");
        }
    });
};

const executeSelectQuery = (sql, params, callback) => {
    initDb();
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error("Error executing query:", err.message);
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const executeInsertUpdateDeleteQuery = (sql, params, callback) => {
    initDb();
    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error executing query:", err.message);
            callback(err, null);
        } else {
            callback(null, this);
        }
    });
};

module.exports = {
    initDb,
    insertInto,
    executeSelectQuery,
    executeInsertUpdateDeleteQuery
};
