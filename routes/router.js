const express = require('express');
const router = express.Router();
const {getlogin,getdashboard,getregister,register,login,logout} = require('../controllers/authController');
const auth = require('../middleware/auth');

/*router.get('/',auth,(req, res) => {
    res.render('index',{user:req.user});
});*/

/*router.get('/login',(req, res) => {
    res.render('login',{alert:false});
});*/

/*router.get('/register',(req, res) => {
    res.render('register');
});*/

router.get('/',auth,getdashboard);
router.get('/login',getlogin);
router.get('/register',getregister);


router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);


module.exports =router;