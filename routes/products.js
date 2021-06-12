var express = require('express');
var router = express.Router();
let Product = require("../Models/products")
var checkSessionAuth = require("../Middlewares/Usersessionauth");
const Usersessionauth = require('../Middlewares/Usersessionauth');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products = await Product.find();
 
  res.render('products/list',{products});
});
//Add prodcut
router.get('/add',Usersessionauth, function(req, res, next) {
  
  res.render('products/add');
});
router.post('/add', async function(req, res, next) {
  console.log(req.body);
  let product = new Product(req.body);
  await product.save()
 res.redirect('/products');
});
router.get('/Delete/:id',Usersessionauth, async  function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id)
  res.redirect('/products');
});
router.get('/Edit/:id', Usersessionauth, async  function(req, res, next) {
  let product = await Product.findById(req.params.id)
  res.render('products/edit',{product});
});
router.post("/Edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
 
  product.Name = req.body.Name;
  product.Price = req.body.Price;
  product.image = req.body.image;
  await product.save();
  res.redirect("/products");
});

router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  let cart=[];
  if(req.cookies.cart) cart = req.cookies.cart
  cart.push(product);
  res.cookie("cart",cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart
  cart.splice(
    cart.findIndex((c)=> c._id==req.params.id),1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
module.exports = router;
