require('dotenv').config(); //inicia el paquete de dotenvPath

const express = require('express');

const PORT=process.env.PORT || 3000;

const conexion = require('./db');

const app=express();

app.set('view engine','ejs'); //plantilla

app.use(express.static('public')) //setea los archivos  de la carpeta public

app.use(express.urlencoded({extended: false})); //para que reconozca el body
app.use(express.json());//respuesta en json


//1er forma de routes
//app.use('/',require('./routes/alumnos'));

//2da forma de routes
const alumnosrouter = require('./routes/alumnos');
app.use(alumnosrouter);

//app.use('/',require('./routes'));

app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});