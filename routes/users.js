var express = require('express');
var router = express.Router();
const User = require("../Models/user");

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('user/register');
});
router.get('/login', function(req, res, next) {
  res.render('user/login');
});
router.post('/register',async  function(req, res, next) {
  let user = new User(req.body)
  await user.save();
  res.redirect("/")

});
router.post('/login',async  function(req, res, next) {
  let user = await User.findOne({Email:req.body.Email,Password:req.body.Password})
  if(!user) return res.redirect("/login")
  req.session.user = user
  res.redirect("/")
  router.get('/logout', function(req, res, next) {
    req.session.user = null
    res.redirect('/login');
  });  
  

});


module.exports = router;
