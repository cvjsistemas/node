const mysql = require('mysql');
//CREA CONEXION
    const dbcon = mysql.createConnection({
        host: 'localhost',
        database: 'articulosdb',
        user:'root',
        password:''
        });
        
        dbcon.connect((err) => {
        
        
            if (err) {
                throw err;
            } else{
                console.log('CONEXION EXITOSA');
            }
        
        });

        //SELECT
        dbcon.query('SELECT * FROM articulos',(err, results,fields) => {
            if (err) {
                throw err;
            }
        
            results.forEach(result=>{
                console.log(result);
            });
        });

        //INSERT
    /*     dbcon.query('INSERT INTO articulos (descripcion,precio,stock) VALUES ("ARTICULO 15","123","14")',(err,results)=>{
            if (err) {
                throw err;
            }

        console.log('Registro Agregado!!!',results);

        }); */

        //UPDATE
     /*    dbcon.query('UPDATE articulos SET precio="213",stock="55" WHERE id="15"',(err, results)=>{
            if (err) {
                throw err;
            }

            console.log('Registro Actualizado!!!',results);

        }); */

        //DELETE
        dbcon.query('DELETE FROM articulos WHERE id=15',(err, results)=>{
            if (err) {
                throw err;
            }

            console.log('Registro Eliminado!!!',results);

        });








        
        
        dbcon.end();

