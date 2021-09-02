const jwt = require('jsonwebtoken');
const conexion = require('../database/db');
//var config = require('../config');

const authorization = (req, res, next) => {
    const cookie =  req.headers.cookie;

    if (cookie){

        const token = cookie.split('=').pop();
   
        try {
            const data = jwt.verify(token, process.env.JWT_SECRETO);
            conexion.query('SELECT * FROM users WHERE id = ?', [data.id], (error, results)=>{
               if(!results){return next()}
               req.user = results[0]
               return next()
           })
           } catch {
             return res.sendStatus(403);
           }



    } else{
       res.status(201).render('login', { alert : 'unauthorized' } );
    }

  

  };

module.exports = authorization;
