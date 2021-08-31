const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');// funciona con async y await
const conexion = require('../database/db');
const {promisify}= require('util'); //para promesas 


const getlogin =(req,res )=>{
    res.render('login',{alert:false});
}

const getdashboard =(req,res)=>{
    res.render('index',{user:req.user});
}


const getregister =(req, res)=>{
    res.render('register');
}


const register =async(req, res)=>{
   
    try {

        const name=req.body.nombre;
        const user=req.body.user;
        const pass=req.body.pass;


        let passhash =await bcryptjs.hash(pass,8);

        conexion.query('INSERT INTO users SET ?',{name: name, user:user,pass: passhash},(error, results)=>{
            if(error){
                console.log(error);
            } else{
                res.status(200).redirect('/');
            }
        });

    } catch (error) {
        console.log(error);
    }

  
   
   
    
};



const login =async(req, res)=>{
     try {
        const user=req.body.user;
        const pass=req.body.pass;

        if(!user || !pass){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        } else {
            conexion.query('SELECT * FROM users WHERE user= ?',[user], async(error,results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].pass)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                 } else{
                    //incio de sesion ok
                    const id = results[0].id;
                    const token =jwt.sign({id:id},process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                       //generamos el token SIN fecha de expiracion
                   //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)

                   const cookieOptions ={
                       expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                       httpOnly: true
                   }

                   res.cookie('access_token',token,cookieOptions);
                   res.render('login',{
                    alert: true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "LOGIN CORRECTO!!",
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 800,
                    ruta: ''    
                     })

              }
        })
    } 
        
    } catch (error) {
        console.log(error);
    }
};


/*const isauthenticated = async (req,res,next)=>{//next se usa para los middleware
    
    try {
        await conexion.query('SELECT * FROM users WHERE id = ?', ['1'], (error, results)=>{

        console.log(results);
            if(results.length==0){
                res.status(500).send('No estas autenticado');
            } else{
                req.user = results[0]
                return next()
            }
           
        })
        
    } catch (error) {
        throw error;
    }
   /* if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
     

}; */


const logout =(req, res)=>{
    res.clearCookie('access_token');
    res.redirect('/login');
}

module.exports ={
    getlogin,
    getdashboard,
    getregister,
    register,
    login,
    logout
}

