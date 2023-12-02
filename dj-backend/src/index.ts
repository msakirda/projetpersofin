import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
const cors = require('cors');

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

// Change the route method to 'post'
app.post('/users/connect', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findByPk(username) as User | null;

  if (user) {
    if (user.password !== password) {
      res.json({ signedUp: false, message: "Mauvais combo username / password." });
    } else {
      res.json({ signedUp: true, message: "Connection réussie." });
    }
  } else {
    res.json({ signedUp: false, message: "Cet utilisateur n'existe pas dans la BDD." });
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


  



