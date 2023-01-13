module.exports = app => {
  const Products = require("./controllers/products.controller.js");
  const Users = require("./controllers/users.controller.js");
  const Orders = require("./controllers/orders.controller.js");
  var router = require("express").Router();
  // PRODUCTS ROUTES
  router.post("/products/", Products.create);
  // Retrieve all products
  router.post("/products/get/", Products.findAll);

  router.get("/products/get/:id", Products.findOne);
  // Update a Tutorial with id
  router.put("/products/:id", Products.update);
  // Delete a Tutorial with id
  router.delete("/products/:id", Products.delete);

  // USER ROUTES
  router.post("/users/register", Users.create);
  // Retrieve all users
  router.get("/users/", Users.findAll);
  // to do login user
  router.post("/users/login", Users.login);
  // Update a user with id
  router.put("/users/:id", Users.update);
  // Delete a user with id
  router.delete("/users/:id", Users.delete);

  // ORDERS ROUTES
  router.post("/Orders/", Orders.create);
  // Retrieve all Orders
  router.get("/Orders/", Orders.findAll);
  // Update a user with id
  router.put("/Orders/:id", Orders.update);
  // Delete a user with id
  router.delete("/Orders/:id", Orders.delete);
  app.use('/api', router);
};