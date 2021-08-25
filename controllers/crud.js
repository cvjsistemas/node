const conexion=require('../database/db.js');



const all =(req,res)=>{
    //res.render('index',{var1:'Esto es una variable'});
    //res.render('index');
   conexion.query('SELECT * FROM users',(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.render('indexdatatable',{results:results});
        }
    });

};

const data =(req,res)=>{

   conexion.query('SELECT * FROM users',(error,results)=>{
        if (error) {
            throw error;
        } else{
            const data=JSON.stringify(results);
            res.send(data);
        }
    });

};

//traemos la vista create
const create = (req,res)=>{
    res.render('create');
};


const save = (req, res)=>{
    const user=req.body.user;
    const rol=req.body.rol;
    //console.log(user + " " + rol);
    conexion.query('INSERT INTO users SET ?',{user:user,rol:rol},(error,results)=>{
        if(error){
            console.log(error);
        } else {
            res.redirect('/');
        }
    })
};

//traemos la vista edit
const edit =(req,res)=>{

    const id=req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.render('edit',{user:results[0]});
        }
    });

};


const update = (req, res)=>{
    const id=req.body.id;
    const user=req.body.user;
    const rol=req.body.rol;
 
    //console.log(user + " " + rol);
    conexion.query('UPDATE users SET ? WHERE id = ?',[{user:user,rol:rol},id],(error,results)=>{
        if(error){
            console.log(error);
        } else {
            res.redirect('/');
        }
    })
};

const delet = (req, res)=>{
    const id=req.params.id;
    conexion.query('DELETE FROM users WHERE id=?',[id],(error,results)=>{
        if (error) {
            throw error;
        } else{
            //res.send(results);
            res.redirect('/');
        }
    });
};
/*exports.save((req,res)=>{
    const user=req.body.user;
    const rol=req.body.rol;
});*/

module.exports={
    all,
    data,
    create,
    save,
    edit,
    update,
    delet
}