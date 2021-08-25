/*const http = require('http');
const colors = require('colors');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/html;charset=UTF-8'});
    res.write('<h3>Server basico con NODE JS</h3>');
    console.log('peticion web server');
    res.end();
});

server.listen(3000);
console.log('Ejecutando un servidor local'.green);*/

require('dotenv').config(); //inicia el paquete de dotenvPath



const express = require('express');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt= require('bcryptjs');
const session = require('express-session');

const Sequelize = require('sequelize');

const conxsequelize = new Sequelize('postres_db','root','',{
    host: 'localhost',
    dialect:'mysql'
});

const postresModel = conxsequelize.define('postres',{
    "id":{type:Sequelize.INTEGER,primaryKey:true},
    "nombre": Sequelize.STRING,
    "calorias":Sequelize.INTEGER
});

conxsequelize.authenticate()
    .then(()=>{
        console.log('CONEXION CORRECTA A LA BD');
    })
    .catch(error =>{
        console.log('EL ERROR DE LA CONEXION ES '+ error);
    });


  postresModel.findAll({attributes:['nombre','calorias']})
    .then(postres =>{
        const resultados = JSON.stringify(postres);
        console.log(resultados);
    })
    .catch(error=>{
        console.log(error);
    })  ;

const keys =  require('./settings/keys');
const {body, validationResult} = require('express-validator');
//const cors = require('cors');
//const {conexion} = require('./db/mysql');
const app= express();

const mysqlstore = require('express-mysql-session');
const options = {
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '',
    database: 'prueba_session'
};

const sessionstore = new mysqlstore(options);

app.use(session({
    key:'cookie_usuario',//nombre de la cookie
    secret:'123456',
    store:sessionstore,
    resave:true,
    saveUninitialized:true
}));





app.set('key',keys.key);
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');//PLANTILLAS

app.use(express.static('public'));
app.use('/recursos',express.static(__dirname+'/public'));




//app.use(express.json);
//app.use(cors);

const port=process.env.PORT || 3000; //


app.get('/',(req,res)=>{
    res.status(200).send('hola mundo');
});

app.post('/login',(req,res)=>{

    /*if (!req.get('Authorization')){
        return next(createError(401));
     }*/

    if(req.body.usuario =='admin' && req.body.pass=='12345'){
        const payload={
            check:true
        };

        const token = jwt.sign(payload,app.get('key'),{
            expiresIn:'7d'
        });
        res.json({
            message:'AUTENTICACION EXITOSA',
            token:token
        });
    } else {
        res.json({
            message:'Usuario y Password incorrectos'
        })
    }

});


const verificacion = express.Router();

verificacion.use((req,res,next)=>{
    
    const token = req.headers.authorization.split(' ').pop();//pop retorna el ultimo valor
    console.log(token);
    
    if (!token){
        res.status(409).send({error:'Es necesario un token de autenticacion'});
    }  else {
        jwt.verify(token,app.get('key'),(err,decoded)=>{
            if(err){
                return res.json({message:'El token no es valido'});
            } else {
                req.decoded=decoded;
                next();
            }
        });
    }

});

app.get('/info',verificacion,(req,res)=>{
    res.json('INFORMACION IMPORTANTE ENTREGADA');
});

app.post('/login2',async(req,res)=>{

    const usuario = req.body.usuario;
    const password = req.body.password;

    console.log(usuario);

    if(usuario=='admin' && password=='12345'){
       const passhash = await bcrypt.hash(password,8);
        res.json({
            message:'AUTENTICACION EXITOSA',
            passhash :passhash
        });
    } else{
        res.json({message:'DATOS INCORRECTOS'});
    }
});

app.get('/plantilla',(req,res)=>{
    res.render('index');
});

app.get('/comparar',(req,res)=>{

    const hashsaved = '$2a$08$w.B.qJ12z9HqhW8BmuJK0uwYKa56W/FGOM1.cGi1D/RJEip6vtu0i';

    const compare =bcrypt.compareSync('12345',hashsaved);

    if(compare){
        res.json({message:"son iguales"});
    } else{
        res.json({message:"no son iguales"});
    }


});

app.get('/session',(req,res)=>{
    req.session.usuario ='Juan Perez';
    req.session.rol='Admin';
    req.session.visitas= req.session.visitas ? ++req.session.visitas:1;
    res.send(`El usuario <strong>${req.session.usuario}</strong>
               con rol    <strong>${req.session.rol}</strong>
               ha visitado esta pagina <strong>${req.session.visitas}</strong>
    
    `);
});


app.post('/registrar',[
    body('nombre','Ingrese un nombre y apellido completo')
        .exists()
        .isLength({min:5}), 
    body('email','Ingresa un e-mail valido')
        .exists()
        .isEmail(),
    body('edad','Ingrese un valor numerico')
    .exists()
    .isNumeric()
],(req,res)=>{
    /*const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({error:errors.array()});
        console.log(errors);
    }*/
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errors.array();
        res.render('index',{validaciones:validaciones,valores:valores});
        
    } else {
        const enviado= req.body;
        res.status(200).json({msg:"validacion exitosa",datos:[enviado]});
        //console.log(enviado);
    }


});

app.listen(port, (req, res)=>{
 console.log(`Servidor escuchando en el puerto ${port}`);
});


