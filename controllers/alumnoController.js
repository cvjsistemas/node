const Alumno = require('../model/Alumno');

const mostrar =(req, res)=>{
    Alumno.find({},(error,alumnos)=>{
        if(error){
            return res.status(500).json({
                message: error
            });
        } else{
            //console.log(alumnos);
            //return res.status(200).send(alumnos);
            res.render('index',{alumnos:alumnos});
        }
    })
};

//CREAr

const save = (req,res)=>{


    const alumno = new Alumno({
        nombre:req.body.nombre, 
        edad:req.body.edad
    })
    //const resultado = await alumno.save();
    ///console.log(resultado);
    alumno.save((error,alumno)=>{
        if(error){
            return res.status(500).json({
                message: error
            });
        } else{
            res.redirect('/');
        }
    });
};

const edit =(req, res)=>{
    
    const id = req.params.id;//metodo get
    //console.log(req.id);

    const alumno = Alumno.findOne({_id:id},(error,alumno)=>{
        if(error){
            return res.status(500).json({
                message: error
            });
           
        } else{
            //console.log(alumno);
            res.status(200).send(alumno);
            //return res.status(200).send(alumnos);
          
        }
    })

};

const update =  (req, res)=>{

    const id = req.body.ideditar;
    const nombre=req.body.nombre_editar;
    const edad=req.body.edad_editar;

    //console.log(req.body);

    Alumno.findByIdAndUpdate(id,{nombre,edad},(error,alumno)=>{
        if(error){
            return res.status(500).json({
                message: error
            });
        } else{
            res.status(200).redirect('/');
        }
    });
   /* const alumno = await Alumno.updateOne({_id:id},
        {
            $set :{
                nombre:"ALBERTO MODIFICADO",
                edad:"15"
            }
        }
    )*/

};

const delet =  (req, res)=>{

    const id = req.params.id;



    Alumno.findByIdAndRemove(id,(error,alumno)=>{

        if(error){
            return res.status(500).json({
                message:error
            });
        } else{
            res.status(200).redirect('/');
        }

    });
  
}



module.exports ={
    mostrar,
    save,
    edit,
    update,
    delet
}