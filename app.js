require('dotenv').config(); //inicia el paquete de dotenvPath

const express = require('express');

const PORT =process.env.PORT || 3000;

const app=express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/',require('./router'));

/*app.get('/',(req,res)=>{
    res.status(200).json({message:"OK"});
});*/

app.listen(PORT,()=>{
console.log(`Servidor UP en el puerto: ${PORT}`);
});


