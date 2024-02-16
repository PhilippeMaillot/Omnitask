const db = require("../config/db");

class TaskModel {
    static getAllTasks = async (cb) => {
        const query = "SELECT * FROM tache";
        db.query(query, cb);
    };

    static add = async (id_cat, intitule, contenu) => {
        const query = "INSERT INTO tache (id_cat, intitule, contenu) VALUES (?, ?, ?)";
        await db.query(query, [id_cat, intitule, contenu]);
    };

    static getInfo = async (id, cb) => {
        const query = "SELECT * FROM tache WHERE id = ?";
        db.query(query, [id], cb);
    };
    
    static updateCat = async (id, newCat) => {
        const query = "UPDATE tache SET id_cat = ? WHERE id = ?";
        await db.query(query, [newCat, id]);
    };
    
    static updateIntitule = async (id, newIntitule) => {
        const query = "UPDATE tache SET intitule = ? WHERE id = ?";
        await db.query(query, [newIntitule, id]);
    };
    
    static updateContenu = async (id, newContenu) => {
        const query = "UPDATE tache SET contenu = ? WHERE id = ?";
        await db.query(query, [newContenu, id]);
    };

    static delete = async (id) => {
        const query = "DELETE FROM tache WHERE id = ?";
        await db.query(query, [id]);
    };
}

module.exports = TaskModel;