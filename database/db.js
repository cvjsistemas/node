const mysql = require('mysql');

const conexion =mysql.createConnection({
    host: process.env.DB_HOST ,
    user:process.env.DB_USER || 'root',
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE || 'loginjwt'
})

conexion.connect((error)=>{
    if(error){
        return console.log(error);
    } else{
        console.log('Conectado a Mysql');
    }
})


module.exports = conexion;