var express = require('express');
var router = express.Router();
const User = require("../Models/user");
const Customer = require("../Models/customers");
var bcrypt = require("bcryptjs");


/* GET users listing. */
//  register page
router.get('/register', function (req, res, next) {
  res.render('user/register');
});
//  login page
router.get('/login', function (req, res, next) {
  res.render('user/login');
});
// register user
router.post('/register', async function (req, res, next) {
  let user = await User.findOne({
    Email: req.body.Email
  })
  if (user) return res.redirect("/register")
  user = new User(req.body)

  let salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(user.Password, salt);

  await user.save();
  res.redirect("/")

});
// -----------------------------------------------------------------------------------------------------------
// render dev login page
router.get('/dev', function (req, res, next) {
  res.render('user/dev');
});
// check login credentials
router.post('/dev', async function (req, res, next) {
  let dev = await User.findOne({
    Email: req.body.Email
  })
  if (dev.role == "admin") {
    req.session.dev = dev
    return res.redirect("/products")
  }
  router.get('/logout', function (req, res, next) {
    req.session.dev = null
    res.redirect('/login');
  })
});
// -----------------------------------------------------------------------------------------------------------
router.get('/checkout', function (req, res, next) {
  res.render('user/checkout');
});

router.post('/checkout', async function (req, res, next) {
  let customer = new Customer
  customer.Name = req.body.Name,
    customer.Contact = req.body.Contact,
    customer.Address = req.body.Address,
    customer.Card_Number = req.body.Card_Number,
    customer.Expiry = req.body.Expiry,
    customer.Security_Code = req.body.Security_Code,
    await customer.save();

  res.redirect('/products');
});


// login session
router.post('/login', async function (req, res, next) {
  let user = await User.findOne({
    Email: req.body.Email,
    Password: req.body.Password
  })
  if (!user) return res.redirect("/login")
  req.session.user = user
  res.redirect("/")
  router.get('/logout', function (req, res, next) {
    req.session.user = null
    res.redirect('/login');
  });


});




module.exports = router;