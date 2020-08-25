var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('login', UserController.loginUser)
router.post('registro', UserController.createUser)
module.exports = router;
