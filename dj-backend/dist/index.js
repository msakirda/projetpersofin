"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./models/user.model"));
// Création de l'application Express
const app = (0, express_1.default)();
const port = 3000;
// Configuration de Sequelize pour SQLite
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: console.log, // Active les logs Sequelize
});
sequelize.sync({ force: true })
    .then(() => {
    // Démarrage du serveur Express après la synchronisation
    app.listen(port, () => {
        console.log(`Serveur en cours d'exécution sur le port ${port}`);
    });
})
    .catch((error) => {
    console.error('Erreur de synchronisation Sequelize :', error);
});
// Middleware pour traiter les requêtes au format JSON
app.use(express_1.default.json());
// Routes
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ici, reçu depuis le client: ", req.body);
    const data = req.body;
    try {
        // Création d'un nouvel utilisateur dans la base de données
        const newUser = yield user_model_1.default.create(data);
        // Renvoi de la réponse avec l'ID du nouvel utilisateur
        res.json(req.body);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur dans la base de données.' });
    }
}));
app.get('/users/:id/exists', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = yield user_model_1.default.findByPk(userId);
        if (!user) {
            return res.json({ exists: false });
        }
        // Renvoi true si l'utilisateur existe, sinon false
        res.json({ exists: true });
    }
    catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur dans la base de données:', error);
        res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur dans la base de données.' });
    }
}));
