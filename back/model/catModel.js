const db = require("../config/db");

class CatModel {
    static getAllCats = async (cb) => {
        const query = "SELECT * FROM catégorie";
        db.query(query, cb);
    };
}

module.exports = CatModel;
