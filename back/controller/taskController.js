const model = require("../model/taskModel");

class TaskController {
    static getAllTasks = async (req, res) => {
        try {
            model.getAllTasks((err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static add = async (req, res) => {
        console.log(req.body);
        try {
            const { id_cat, intitule, contenu } = req.body;                
            await model.add(id_cat, intitule, contenu);
            res.status(200).json({ message: "la tache a bien été ajoutée !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static update = async (req, res) => {
        try {
            const { id, id_cat, intitule, contenu } = req.body;
    
            const updatedFields = [];
    
            if (id_cat) {
                await model.updateCat(id, id_cat);
                updatedFields.push("id_cat");
            }
    
            if (intitule) {
                await model.updateIntitule(id, intitule);
                updatedFields.push("intitule");
            }

            if (contenu) {
                await model.updateContenu(id, contenu);
                updatedFields.push("contenu");
            }
    
            res.status(200).json({ message: `La ou les donnée(s) suivante(s) a/ont été mise(s) à jour : ${updatedFields.join(', ')}` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static delete = async (req, res) => {
        try {
            const { id } = req.params; // Récupérer l'ID à partir des paramètres de la requête
            await model.delete(id);
            res.status(200).json({ message: "Tâche supprimée !" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    };
    

    static getInfo = async (req, res) => {
        try {
            const { id } = req.body;
            model.getInfo(id, (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Erreur serveur" });
                } else {
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = TaskController;
