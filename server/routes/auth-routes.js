const { Router } = require('express');
const authController = require('../controllers/auth-controllers');

const router = Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//poner las que no tengas nada


module.exports = router;
