var express = require('express');
var router = express.Router();
let Product = require("../Models/products")

const Usersessionauth = require('../Middlewares/Usersessionauth');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let products = await Product.find();
  res.render('products/list', {
    products
  });
});

//Add prodcut
// this is only allowed by the DEV
router.get('/add', function (req, res, next) {
  res.render('products/add');
});

router.post('/add',async function (req, res, next) {
  console.log(req.body);
  let product = new Product({
    Name: req.body.Name,
    Price:req.body.Price,
    image: req.body.image,
    Description: req.body.Description,
    Status: req.body.Status
  });
  await product.save()
  res.redirect('/products');
});

router.get('/Delete/:id', async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id)
  res.redirect('/products');
});

router.get('/Edit/:id', async function (req, res, next) {
  let product = await Product.findById(req.params.id)
  res.render('products/edit', {
    product
  });
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
  let product;
  await Product.findOne({
    _id: req.params.id
  }).then(res => {
    product = res;
  });
  let cart;
  let prod;
  if (req.cookies.cart) {
    cart = req.cookies.cart
    prod = cart.filter(item => item._id === req.params.id);
    if (prod.length !== 0) {
      let prod_index = cart.indexOf(prod[0]);
      cart.splice(prod_index, 1);
      prod[0].quantity++;
      prod[0].Price = prod[0].quantity * parseInt(prod[0].Price);
      cart.push(prod[0]);
      res.cookie("cart", cart);
    } else {
      let prod2 = {
        _id: product._id,
        quantity: 1,
        Price: product.Price,
        Name: product.Name,
        image: product.image
      }
      cart.push(prod2);
      res.cookie("cart", cart);
    }
  } else {
    let prod2 = {
      _id: product._id,
      quantity: 1,
      Price: product.Price,
      Name: product.Name,
      image: product.image
    }
    cart = [];
    cart.push(prod2);
    res.cookie("cart", cart);
  }

  res.redirect("/cart");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id), 1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
module.exports = router;