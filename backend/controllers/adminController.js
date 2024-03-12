const repository = require("../db/database");


const createDb = (req, res) => {
    repository.initDb()
    res.send();
}

const createDummyData = (req, res) => {
    repository.insertInto();
    res.send();
}

module.exports = {
    createDb,
    createDummyData
};
