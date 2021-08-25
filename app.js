require('dotenv').config(); //inicia el paquete de dotenvPath


const url = process.env.MONGOOSE_URI;

const mongoose = require('mongoose');

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})
.then(() => {
    console.log('CONECTADO A MONGODB');
})
.catch(err => console.error(err));

const personaSchema=mongoose.Schema({
    nombre: String,
    edad: Number,
    pais: String
    },{versionKey:false});

const PersonaModel =mongoose.model('personas',personaSchema);


//MOSTRAR

const mostrar = async ()=>{
    const personas = await PersonaModel.find();
    console.log(personas);
}


//CREAr

const crear =async ()=>{
    const persona = new PersonaModel({
        nombre:'ALBERTO', 
        edad:25,
        pais:'ESPAÑA'
    })
    const resultado = await persona.save();
    console.log(resultado);
};

const actualizar = async (id)=>{
    const persona = await PersonaModel.updateOne({_id:id},
        {
            $set :{
                nombre:"ALBERTO MODIFICADO",
                pais:"ESPAÑA MODIFICADO"
            }
        }
    )

};

const eliminar = async (id)=>{
    const persona = await PersonaModel.deleteOne({_id:id});
    console.log(persona);
}


//LLAMAMOS A LOS PROCEDIMIENTOS


//mostrar();
//crear();
//actualizar('611b2ac5ad040408c0efcc89');
//eliminar('611b29e9906bf13308dac5f7');

const express = require('express');
const app=express();
const PORT=process.env.PORT || 3000;

app.listen(PORT,(req,res)=>{
    console.log('SERVIDOR ESCUCHANDO EN EL PUERTO' + PORT);
});
