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
const crypto = require('crypto'); // Import the 'crypto' module
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
// Replace jwt with crypto for token creation and verification
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    // Replace jwt.verify with crypto for token verification
    const secretKey = 'votre_clé_secrète';
    const [header, payload, signature] = token.split('.');
    const cryptoSignature = crypto.createHmac('sha256', secretKey).update(header + '.' + payload).digest('base64');
    if (signature !== cryptoSignature) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
    req.user = user;
    next();
};
// Change the route method to 'post'
app.post('/users/connect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield user_model_1.default.findByPk(username);
    if (user) {
        if (user.password !== password) {
            res.json({ signedUp: false, message: "Mauvais combo username / password." });
        }
        else {
            // Replace jwt.sign with crypto for token creation
            const secretKey = 'mubla_deeps';
            const token = Buffer.from(JSON.stringify({ username: user.username })).toString('base64');
            const signature = crypto.createHmac('sha256', secretKey).update(token).digest('base64');
            const jwtToken = `${token}.${signature}`;
            res.json({ signedUp: true, message: "Connection réussie.", token: jwtToken });
        }
    }
    else {
        res.json({ signedUp: false, message: "Cet utilisateur n'existe pas dans la BDD." });
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
            return res.json({ exists: false, response: `Compte Utilisateur [${req.params.username}] créé avec succès.` });
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
