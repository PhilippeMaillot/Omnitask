const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');
const catRouter = require('./routes/cat');

// Options de CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message);
  } else {
    console.log('Connexion à la base de données établie');
  }
});

app.use(express.json()); // Utilisez le middleware express.json() pour analyser les requêtes au format JSON
app.use(cors(corsOptions));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Autoriser spécifiquement ce domaine
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Routes de l'API
app.use('/', indexRouter);
app.use('/task', taskRouter);
app.use('/cat', catRouter);

app.listen(8080, () => {
  console.log('Serveur à l\'écoute');
});