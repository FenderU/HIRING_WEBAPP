//Thanks to Abiham Ramos for the basis of code!
const express = require("express") 
const bodyParser = require('body-parser')
const app = express() 

app.set("view engine", "ejs") 

// parseo de html forms
// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

// Rutas
app.get("/", (req, res) => {
    res.render('index')
})

app.listen(3000) // server usa puerto 3000

