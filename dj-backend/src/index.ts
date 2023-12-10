import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken

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
      res.json({ signedUp: true, message: 'Connection réussie.', token });
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

      return res.json({ exists: false, response: `Compte Utilisateur [${req.params.username}] créé avec succès.` });
    } else {
      res.json({ exists: true, response: "Cet Utilisateur existe déjà, création de compte impossible." });
    }
  } catch (error) {
    console.error('Error creating or checking user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


  



