const mongoose = require('mongoose');

const url=process.env.MONGODB_URI;

const conexion=mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('CONECTADO A MONGODB');
})
.catch(err => console.error(err));

module.exports=conexion;