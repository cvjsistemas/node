const express = require('express');
const router = express.Router();

const conexion = require('./database/db');
const {all,data,create,save,edit,update,delet} = require('./controllers/crud');


router.get('/',all);

router.get('/data',data);

/*router.get('/',(req,res)=>{
    //res.send('CONTACTO');

    //res.render('index',{var1:'Esto es una variable'});
   
    //res.render('index');
   conexion.query('SELECT * FROM users',(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.render('index',{results:results});
        }
    });

});*/

//traemos la vista create
router.get('/create',create);
/*router.get('/create',(req,res)=>{
    res.render('create');
});*/

//traemos la vista edit
router.get('/edit/:id',edit);
/*router.get('/edit/:id',(req,res)=>{

    const id=req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.render('edit',{user:results[0]});
        }
    });

});*/


router.post('/save',save);
router.post('/update',update);
router.get('/delete/:id',delet);

/*router.get('/delete/:id',(req,res)=>{
    const id=req.params.id;
    conexion.query('DELETE FROM users WHERE id=?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.redirect('/');
        }
    });
});*/

module.exports = router;
