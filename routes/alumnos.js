const express = require('express');
const router = express.Router();

const {mostrar,save,edit,update,delet} = require('../controllers/alumnoController');


router.get('/',mostrar);
router.post('/save',save);
router.get('/edit/:id',edit);

router.post('/update',update);
router.get('/delete/:id',delet);


module.exports=router;