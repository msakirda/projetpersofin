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
const multer_1 = __importDefault(require("multer"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
require('dotenv').config();
// Création de l'application Express
const app = (0, express_1.default)();
const port = 3000;
// Utiliser les variables d'environnement
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const serverPort = process.env.SERVER_PORT;
const nodeEnv = process.env.NODE_ENV;
// Configuration de Sequelize pour SQLite
exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Ajoutez ceci si vous rencontrez des problèmes avec l'auto-signature du certificat
        },
    },
});
const user_model_1 = __importDefault(require("./models/user.model"));
const profile_model_1 = __importDefault(require("./models/profile.model"));
const userfiles_model_1 = __importDefault(require("./models/userfiles.model"));
const project_model_1 = __importDefault(require("./models/project.model"));
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
    app.use('/uploads', express_1.default.static('uploads')); //for the server to be able to serve images
    app.options('*', cors());
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});
const secretKey = 'mubla_deeps';
const authenticateToken = (req, res, next) => {
    let token = req.body.token || req.params.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    console.log("token ", token, " va être vérifié.");
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    });
};
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
            res.json({ signedUp: true, message: 'Connection réussie.', token, user });
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
                phone: "",
                address: "",
                country: "",
            });
            const newAvatar = yield userfiles_model_1.default.create({
                username: req.params.username, // Assuming 'username' is a required field
                avatarUrl: "",
            });
            // Create a token JWT
            const token = jwt.sign({ username: req.params.username }, secretKey, { expiresIn: '1h' });
            res.json({ signedUp: true, message: 'Compte Utilisateur [${req.params.username}] créé avec succès.', token, user });
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
app.put('/api/updateProfile', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        // Vous pouvez maintenant accéder aux détails du fichier dans req.file
        const [updatedRowCount] = yield profile_model_1.default.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            country: req.body.country,
        }, { where: { username: req.body.username } });
        if (updatedRowCount > 0) {
            res.json({ message: 'Profil mis à jour avec succès' });
        }
        else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
    }
}));
app.get('/getProfile/:token/:username', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the user in the database
        const user = yield profile_model_1.default.findOne({ where: { username: req.params.username } });
        res.json(user);
    }
    catch (error) {
        console.error('Error during user authentication:', error);
        res.status(500).json({ signedUp: false, message: 'Internal Server Error.' });
    }
}));
app.post('/api/changePassword', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, currentPassword, newPassword } = req.body;
        // Vérifiez le mot de passe actuel dans votre modèle utilisateur
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // Comparez le mot de passe actuel avec celui fourni dans la requête
        if (user.password !== currentPassword) {
            return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
        }
        // Mettez à jour le mot de passe avec le nouveau mot de passe
        user.password = newPassword;
        yield user.save();
        res.json({ message: 'Mot de passe mis à jour avec succès' });
    }
    catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Erreur lors de la modification du mot de passe' });
    }
}));
app.post('/api/changeEmail', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, newEmail } = req.body;
        // Vérifiez le mot de passe actuel dans votre modèle utilisateur
        const user = yield user_model_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        // Mettez à jour le mot de passe avec le nouveau mot de passe
        user.email = newEmail;
        yield user.save();
        res.json({ message: 'Email mis à jour avec succès' });
    }
    catch (error) {
        console.error('Error changing email:', error);
        res.status(500).json({ message: 'Erreur lors de la modification de l email' });
    }
}));
//avatar
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.put('/api/changeAvatar', authenticateToken, upload.single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // You can now access the details of the file in req.file
        const avatarUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : 'default_avatar_url';
        // Update the avatar URL in the database using Sequelize
        yield userfiles_model_1.default.update({ avatarUrl: avatarUrl, username: req.body.username }, { where: { username: req.body.username } });
        res.json({ message: 'Avatar changed successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error changing avatar' });
    }
}));
app.get('/getAvatar/:token/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFiles = yield userfiles_model_1.default.findOne({ where: { username: req.params.username } });
        if (!userFiles) {
            return res.status(404).json({ message: 'User not found' });
        }
        const avatarUrl = userFiles.avatarUrl;
        res.json({ avatarUrl });
    }
    catch (error) {
        console.error('Error fetching avatar:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
function generateUniqueFileName() {
    const randomString = (0, uuid_1.v4)().replace(/-/g, ''); // Utilise la bibliothèque uuid pour générer un identifiant unique
    const uniqueFileName = `video_${randomString}.mp4`; // Nom de fichier avec l'extension .mp4
    return uniqueFileName;
}
app.post('/generate-video', upload.array('videoFiles'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = req.files;
        const audioFile = files[files.length - 1];
        files = files.slice(0, files.length - 1);
        const imagesAmount = files.length;
        const inputFiles = files.map(file => path_1.default.join(`uploads/${file.filename}`));
        console.log('Chemin des fichiers:', inputFiles, " nombre de fichiers= ", imagesAmount);
        const outputVideo = path_1.default.join('uploads', generateUniqueFileName());
        const durationPerImage = req.body.eachPageDuration;
        console.log("duration per image coming from client: ", durationPerImage);
        const targetResolution = '1920x1080';
        yield new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input(`concat:${inputFiles.join('|')}`)
                .inputFPS(1.0 / durationPerImage)
                .input(`uploads/${audioFile.filename}`)
                .output(outputVideo)
                .audioCodec('aac')
                .duration(durationPerImage * imagesAmount)
                .videoCodec('libx264')
                // .inputFps(1.0 / durationPerImage)
                // .fps(1.0 / durationPerImage)
                .size(targetResolution)
                .on('end', () => resolve())
                .on('error', (err) => reject(err))
                .run();
        });
        console.log('Ici le serveur, Vidéo générée avec succès:', outputVideo);
        // Renvoie la vidéo au client
        const videoFileName = outputVideo;
        const videoURL = `${req.protocol}://${req.get('host')}/${videoFileName}`;
        res.json({ message: 'Vidéo générée avec succès', url: videoURL });
    }
    catch (error) {
        console.error('Erreur lors de la gestion des fichiers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.post('/generate-video-authenticated', authenticateToken, upload.array('videoFiles'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = req.files;
        const audioFile = files[files.length - 1];
        files = files.slice(0, files.length - 1);
        const imagesAmount = files.length;
        const inputFiles = files.map(file => path_1.default.join(`uploads/${file.filename}`));
        console.log('Chemin des fichiers:', inputFiles, " nombre de fichiers= ", imagesAmount);
        const outputVideo = path_1.default.join('uploads', generateUniqueFileName());
        const durationPerImage = req.body.eachPageDuration;
        console.log("duration per image coming from client: ", durationPerImage);
        const targetResolution = '1920x1080';
        yield new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)()
                .input(`concat:${inputFiles.join('|')}`)
                .inputFPS(1.0 / durationPerImage)
                .input(`uploads/${audioFile.filename}`)
                .output(outputVideo)
                .audioCodec('aac')
                .duration(durationPerImage * imagesAmount)
                .videoCodec('libx264')
                .size(targetResolution)
                .on('end', () => resolve())
                .on('error', (err) => reject(err))
                .run();
        });
        console.log('Ici le serveur, Vidéo générée avec succès:', outputVideo);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'mubla_deeps');
        const username = decodedToken.username;
        console.log("username decoded: ", username);
        // Save each image URL in the database
        for (const inputFile of inputFiles) {
            yield project_model_1.default.create({
                username: username,
                imageURL: inputFile,
                musicUrl: "uploads/" + audioFile.filename,
                projectName: req.body.projectName,
                eachPageDuration: durationPerImage,
                pagesNumber: imagesAmount,
            });
        }
        // Renvoie la vidéo au client
        const videoURL = `${req.protocol}://${req.get('host')}/${outputVideo}`;
        res.json({ message: 'Vidéo générée avec succès', url: videoURL });
    }
    catch (error) {
        console.error('Erreur lors de la gestion des fichiers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
app.get('/api/getProjectsPreview/:username', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const projects = yield project_model_1.default.findAll({
            attributes: ['projectName', 'imageURL', 'username', 'musicUrl', 'eachPageDuration', 'pagesNumber'],
            where: { username: username },
            group: ['projectName'], // Add this line to group by projectName
        });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for the given username' });
        }
        const baseUrl = `http://localhost:${port}/`;
        const projectData = projects.map((project) => ({
            projectName: project.projectName,
            imageURL: baseUrl + project.imageURL,
            username: project.username,
            musicUrl: project.musicUrl,
            eachPageDuration: project.eachPageDuration,
            pagesNumber: project.pagesNumber,
        }));
        console.log("voici les projets trouvés: ", projectData);
        console.log("image url: ", projectData[0].imageURL);
        res.json(projectData);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
user_model_1.default;
app.get('/api/getProjectByProjectName/:projectName', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectName = req.params.projectName;
        const projects = yield project_model_1.default.findAll({
            attributes: ['projectName', 'imageURL', 'username', 'musicUrl', 'eachPageDuration', 'pagesNumber'],
            where: { projectName: projectName },
            group: ['projectName'], // Add this line to group by projectName
        });
        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for the given username' });
        }
        const baseUrl = `http://localhost:${port}/`;
        const projectData = projects.map((project) => ({
            projectName: project.projectName,
            imageURL: baseUrl + project.imageURL,
            username: project.username,
            musicUrl: baseUrl + project.musicUrl,
            eachPageDuration: project.eachPageDuration,
            pagesNumber: project.pagesNumber,
        }));
        console.log("voici les projets trouvés: ", projectData);
        console.log("image url: ", projectData[0].imageURL);
        res.json(projectData);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));
