
import express ,{ Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize';
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken

import multer from 'multer'; 
import path from 'path';

// Création de l'application Express
const app = express();
const port = 3000;

// Configuration de Sequelize pour SQLite
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: console.log, // Active les logs Sequelize
});

import User from './models/user.model';
import Profile from './models/profile.model';
import { log } from 'console';

sequelize.sync()
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
app.use(express.json());
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

const secretKey = 'mubla_deeps';
  

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.body.token;
  if(!token)
     token = req.params.token;

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    next();
  });
};


app.post('/users/connect', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (user && user.password === password) {
      // User found and password matches

      // Create a token JWT
      const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

      // Return the token to the client
      res.json({ signedUp: true, message: 'Connection réussie.', token , user });
    } else {
      // User not found or password does not match
      res.json({ signedUp: false, message: 'Mauvais combo username / password.' });
    }
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ signedUp: false, message: 'Internal Server Error.' });
  }
});

app.post('/users/create/:username', async (req: Request, res: Response) => {
  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findByPk(req.params.username) as User | null;

    if (!user) {
      // Create a new user only if the user doesn't exist
      const newUser = await User.create({
        username: req.params.username, // Assuming 'username' is a required field
        email: req.body.email, // Assuming 'email' is a required field
        password: req.body.password, // Assuming 'password' is a required field
      });
      const newUserProfile = await Profile.create({
        username: req.params.username, // Assuming 'username' is a required field
        firstname: "", // Assuming 'email' is a required field
        lastname: "", // Assuming 'password' is a required field
        email: req.body.email, // Assuming 'password' is a required field
        phone: "",
        address: "",
        country: "",
      });


      // Create a token JWT
      const token = jwt.sign( { username: req.params.username } , secretKey, { expiresIn: '1h' });
      res.json({ signedUp: true, message: 'Compte Utilisateur [${req.params.username}] créé avec succès.', token , user });
    } else {
      res.json({ exists: true, response: "Cet Utilisateur existe déjà, création de compte impossible." });
    }
  } catch (error) {
    console.error('Error creating or checking user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/updateProfile', authenticateToken, async (req, res) => {
  try {
    console.log(req.body);
    
    // Vous pouvez maintenant accéder aux détails du fichier dans req.file

    const [updatedRowCount] = await Profile.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        country: req.body.country,
      },
      { where: { username: req.body.username } }
    );

    if (updatedRowCount > 0) {
      res.json({ message: 'Profil mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
});

app.get('/getProfile/:token/:username', authenticateToken , async (req, res) => {

  try {
    // Find the user in the database
    const user = await Profile.findOne({ where: { username : req.params.username } });
    res.json(user);
    
  } catch (error) {
    console.error('Error during user authentication:', error);
    res.status(500).json({ signedUp: false, message: 'Internal Server Error.' });
  }
});



  



