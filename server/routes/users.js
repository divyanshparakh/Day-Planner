const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const { loginUser, registerUser, refreshToken } = require('../controller/users')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post('/register', registerUser); // Register User

router.post('/login', loginUser); // Login User

router.post('/refresh', verifyToken, refreshToken) // Refresh Token

module.exports = router;
