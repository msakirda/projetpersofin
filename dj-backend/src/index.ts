
import express ,{ Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
const jwt = require('jsonwebtoken'); // Importez jsonwebtoken

import multer from 'multer'; 
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'

// Création de l'application Express
const app = express();
const port = 3000;
// Utiliser les variables d'environnement
const dbHost = process.env.DB_HOST!;
const dbPort = process.env.DB_PORT!;
const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;
const serverPort = process.env.SERVER_PORT!;
const nodeEnv = process.env.NODE_ENV!;

// Configuration de Sequelize pour SQLite
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres' ,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Ajoutez ceci si vous rencontrez des problèmes avec l'auto-signature du certificat
    },
  },
});

import User from './models/user.model';
import Profile from './models/profile.model';
import Project from './models/project.model'
import Diapo from './models/diapo.model';

// sequelize.sync({force: true})
sequelize.sync({})
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
app.use('/uploads', express.static('uploads'));//for the server to be able to serve images
app.options('*', cors());
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
});

const secretKey = process.env.SECRET_KEY;
  

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.body.token || req.params.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]) ;

  console.log("token ", token, " va être vérifié.");

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
        avatarUrl: "",
      });


      // Create a token JWT
      const token = jwt.sign( { username: req.params.username } , secretKey, { expiresIn: '1h' });
      res.json({ signedUp: true, message: `Compte Utilisateur [${req.params.username}] créé avec succès.`, token , user , email:req.body.email });
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

app.post('/api/changePassword', authenticateToken, async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    // Vérifiez le mot de passe actuel dans votre modèle utilisateur
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Comparez le mot de passe actuel avec celui fourni dans la requête
    if (user.password !== currentPassword) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Mettez à jour le mot de passe avec le nouveau mot de passe
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Erreur lors de la modification du mot de passe' });
  }
});

app.post('/api/changeEmail', authenticateToken, async (req, res) => {
  try {
    const { username, newEmail } = req.body;

    // Vérifiez le mot de passe actuel dans votre modèle utilisateur
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }


    // Mettez à jour le mot de passe avec le nouveau mot de passe
    user.email = newEmail;
    await user.save();

    res.json({ message: 'Email mis à jour avec succès' });
  } catch (error) {
    console.error('Error changing email:', error);
    res.status(500).json({ message: 'Erreur lors de la modification de l email' });
  }
});

//avatar

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.put('/api/changeAvatar' ,authenticateToken,  upload.single('avatar'), async (req, res) => {
  try {
    // You can now access the details of the file in req.file
    const avatarUrl = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : 'default_avatar_url';

    // Update the avatar URL in the database using Sequelize
    await Profile.update(
      { avatarURL: avatarUrl },
      { where: { username: req.body.username } }
    );

    res.json({ message: 'Avatar changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error changing avatar' });
  }
});

app.get('/getAvatar/:token/:username', async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ where: { username: req.params.username } });

    if (!userProfile) {                                                                                                             
      return res.status(404).json({ message: 'User not found' });
    }

    const avatarUrl = userProfile.dataValues.avatarURL;
    res.json({ avatarUrl });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

function generateUniqueFileName(): string {
  const randomString = uuidv4().replace(/-/g, ''); // Utilise la bibliothèque uuid pour générer un identifiant unique
  const uniqueFileName = `video_${randomString}.mp4`; // Nom de fichier avec l'extension .mp4
  return uniqueFileName;
}

app.post('/generate-video', upload.array('videoFiles')  ,async (req, res) => {
  try {
    let files = req.files as Express.Multer.File[];
    const audioFile = files[files.length - 1];
    files = files.slice(0 , files.length-1)
    const imagesAmount = files.length
    const inputFiles = files.map(file => path.join(`uploads/${file.filename}`));
    console.log('Chemin des fichiers:', inputFiles, " nombre de fichiers= ", imagesAmount);
    const outputVideo = path.join('uploads', generateUniqueFileName());
    const durationPerImage = req.body.eachPageDuration;
    console.log("duration per image coming from client: ", durationPerImage);
    const targetResolution = '1920x1080';

    await new Promise<void>((resolve, reject) => {
      ffmpeg()
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

  } catch (error) {
    console.error('Erreur lors de la gestion des fichiers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/generate-video-authenticated', authenticateToken , upload.array('videoFiles')  , async (req, res) => {
  try {

    let files = req.files as Express.Multer.File[];
    const audioFile = files[files.length - 1];
    files = files.slice(0 , files.length-1)
    const imagesAmount = files.length
    const inputFiles = files.map(file => path.join(`uploads/${file.filename}`));
    console.log('Chemin des fichiers:', inputFiles, " nombre de fichiers= ", imagesAmount);
    const outputVideo = path.join('uploads', generateUniqueFileName());
    const durationPerImage = req.body.eachPageDuration;
    console.log("duration per image coming from client: ", durationPerImage);
    const targetResolution = '1920x1080';

    await new Promise<void>((resolve, reject) => {
      ffmpeg()
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
  
    const token = req.headers.authorization!.split(' ')[1];
    const decodedToken =  jwt.verify(token, secretKey);
    const username = decodedToken.username;

    console.log("username decoded: " , username );
    

    const baseUrl = `http://localhost:${port}/`;

    //create a project
    Project.create({
      username: username,
      previewURL: baseUrl + inputFiles[0],
      musicUrl: "uploads/" + audioFile.filename,
      projectName : req.body.projectName,
      eachPageDuration : durationPerImage,
      pagesNumber : imagesAmount,
    });
    // Save each image URLs in the database
    inputFiles.forEach((e,i)=> {
      Diapo.create({
        imageURL: e,
        projectName : req.body.projectName,
        index: i
      });
    });

    // Renvoie la vidéo au client
    const videoURL = `${req.protocol}://${req.get('host')}/${outputVideo}`;
    res.json({ message: 'Vidéo générée avec succès', url: videoURL });

  } catch (error) {
    console.error('Erreur lors de la gestion des fichiers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/getProjectsPreview/:username', authenticateToken, async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    const projects = await Project.findAll({
      attributes: ["projectName", "previewURL"],
      where: {username: req.params.username}
    });

    if (!projects || projects.length === 0) {
      return res.json({ message: 'No projects found for the given username' });
    }

    const baseUrl = `http://localhost:${port}/`;

    const projectData = projects.map((project) => ({
      projectName: project.dataValues.projectName,
      previewURL: project.dataValues.previewUrl, // Utiliser le même nom que côté serveur
    }));
    

    console.log("voici les projets trouvés: " , projectData);
    console.log("preview url: " , projectData[0].previewURL);
    
    
    res.json(projectData);

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




app.get('/api/getProjectByProjectName/:projectName', authenticateToken, async (req: Request, res: Response) => {
  try {
    const projectName = req.params.projectName;

    ///////////////////////////////////////////////////////// recuperation projet datas
    const project = await Project.findOne({
      attributes: ["projectName", "imageURL", "username", "musicUrl", "eachPageDuration", "pagesNumber"],
      where: {
        projectName: req.params.projectName
      }
    });

    const baseUrl = `http://localhost:${port}/`;

    const projectData = {
      projectName: project?.dataValues.projectName,
      imageURL: baseUrl + project?.dataValues.previewUrl,
      username: project?.dataValues.username,
      musicUrl: baseUrl + project?.dataValues.musicUrl,
      eachPageDuration: project?.dataValues.eachPageDuration,
      pagesNumber: project?.dataValues.pagesNumber,
    };

    ////////////////////////////////////////////////////// recuperation projet images (diapos)
    const projectDiapos = await Diapo.findAll({
      attributes: ["imageURL"],
      where: {
        projectName: req.params.projectName
      },
      order: ["index"]
    });

    const diaposData = projectDiapos.map((diapo) => ({
      imageURL: baseUrl + diapo.imageURL,
    }));
    /////////////////////////////////////////////////////envoi des settings de projet et des url d images separement
    res.json({projectData , diaposData});

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/api/deleteProject/:projectName', async (req, res) => {
  const projectName = req.params.projectName;
  console.log("va etre supprimé de la bdd: " + projectName);
  

  try {
    // Utiliser destroy pour supprimer un ou plusieurs enregistrements selon la condition
    const result = await Project.destroy({
      where: { projectName: projectName },
    });

    if (result > 0) {
      res.status(204).send(); // 204 No Content pour indiquer le succès sans contenu
    } else {
      res.status(404).json({ message: 'Projet non trouvé.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du projet :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du projet.' });
  }
});