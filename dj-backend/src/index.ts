import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import User from './models/user.model';

// Création de l'application Express
const app = express();
const port = 3000;

// Configuration de Sequelize pour SQLite
const sequelize = new Sequelize({
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
app.use(express.json());

// Routes
app.post('/users', async (req: Request, res: Response) => {
  console.log("ici, reçu depuis le client: " , req.body)
  const data = req.body;

  try {
    // Création d'un nouvel utilisateur dans la base de données
    const newUser = await User.create(data);

    // Renvoi de la réponse avec l'ID du nouvel utilisateur
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur dans la base de données.' });
  }
});

app.get('/users/:id/exists', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findByPk(userId) as User | null;

    if (!user) {
      return res.json({ exists: false });
    }

    // Renvoi true si l'utilisateur existe, sinon false
    res.json({ exists: true });
  } catch (error: any) {
    console.error('Erreur lors de la recherche de l\'utilisateur dans la base de données:', error);
    res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur dans la base de données.' });
  }
});


