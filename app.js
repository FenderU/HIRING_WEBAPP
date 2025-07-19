//Thanks to Abiham Ramos for the basis of code!
const express = require("express") 
const bodyParser = require('body-parser')
const app = express() 
const cors = require('cors');
app.use(cors());
require('dotenv').config();



const path = require('path');
const router = express.Router();

app.set("view engine", "ejs") 


// carga para que views utilice css y js
app.use(express.static('public'));


// parseo de html forms
// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

// Rutas
app.get("/", (req, res) => {
    res.render('index')
})

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/grupo', (req, res) => {
  res.render('grupo');
});

app.get('/empresa', (req, res) => {
  res.render('empresa');
});

app.get('/postulante', (req, res) => {
  res.render('postulante');
});

app.get('/contratado', (req, res) => {
  res.render('contratado');
});
//

//Rutas de API
const contratadoRoutes = require('./routes/contratadoRoutes');
app.use(express.json()); 
app.use('/api/contratado', contratadoRoutes);

//en caso de error
app.use((req, res) => {
    res.status(404).send('<h2>404 - Pagina no encontrada</h2><p>La ruta solicitada no existe.</p>');
});


const PORT=3000
app.listen(PORT, () => {
  console.log(`Servidor web corriendo en puerto ${PORT}`);
});

