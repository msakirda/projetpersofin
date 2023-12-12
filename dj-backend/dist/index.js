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
exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken
// Création de l'application Express
const app = (0, express_1.default)();
const port = 3000;
// Configuration de Sequelize pour SQLite
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: console.log, // Active les logs Sequelize
});
const user_model_1 = __importDefault(require("./models/user.model"));
const profile_model_1 = __importDefault(require("./models/profile.model"));
exports.sequelize.sync()
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
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
const authenticateToken = () => {
    return true;
};
const secretKey = 'mubla_deeps';
app.post('/users/connect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Find the user in the database
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (user && user.password === password) {
            // User found and password matches
            // Create a token JWT
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            // Return the token to the client
            res.json({ signedUp: true, message: 'Connection réussie.', token });
        }
        else {
            // User not found or password does not match
            res.json({ signedUp: false, message: 'Mauvais combo username / password.' });
        }
    }
    catch (error) {
        console.error('Error during user authentication:', error);
        res.status(500).json({ signedUp: false, message: 'Internal Server Error.' });
    }
}));
app.post('/users/create/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = yield user_model_1.default.findByPk(req.params.username);
        if (!user) {
            // Create a new user only if the user doesn't exist
            const newUser = yield user_model_1.default.create({
                username: req.params.username, // Assuming 'username' is a required field
                email: req.body.email, // Assuming 'email' is a required field
                password: req.body.password, // Assuming 'password' is a required field
            });
            const newUserProfile = yield profile_model_1.default.create({
                username: req.params.username, // Assuming 'username' is a required field
                firstname: "", // Assuming 'email' is a required field
                lastname: "", // Assuming 'password' is a required field
                email: req.body.email, // Assuming 'password' is a required field
                avatar: "", // Assuming 'password' is a required field
            });
            // Create a token JWT
            const token = jwt.sign({ username: req.params.username }, secretKey, { expiresIn: '1h' });
            res.json({ signedUp: true, message: 'Compte Utilisateur [${req.params.username}] créé avec succès.', token });
        }
        else {
            res.json({ exists: true, response: "Cet Utilisateur existe déjà, création de compte impossible." });
        }
    }
    catch (error) {
        console.error('Error creating or checking user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Route pour mettre à jour le profil
app.put('/api/profile', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstName, lastName, email, avatar } = req.body;
        // Assurez-vous que le type de userId correspond au type attendu dans votre modèle
        const updatedProfile = yield profile_model_1.default.update({ username, firstName, lastName, email, avatar }, { where: { username: req.params.username } });
        res.json(updatedProfile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}));
