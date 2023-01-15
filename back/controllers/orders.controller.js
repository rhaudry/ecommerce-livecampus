const { Sequelize, Op } = require("sequelize");
const getDb = require("../sequelize");
const jwt = require('jsonwebtoken');
require('dotenv').config({ debug: true, path: __dirname + "/../.env" })
const secret_token = process.env.SECRET_TOKEN;

async function main() {
  const sequelize = await getDb();
  Orders = require("../models/modelOrders.js")(sequelize, Sequelize);
}
main();

exports.create = (req, res) => {
  if (jwt.verify(req.body.token, secret_token)) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const orders = req.body;
    Orders.create(orders)
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });

    res.send({ message: "Done" });
  }
};

exports.findAll = (req, res) => {
  console.log("salut", req.body)
  if (jwt.verify(req.body.token, secret_token)) {
    Orders.findAll({

      where: user_id = req.body.user_id,
    })
      .then(data => {
        console.log(data);
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred"
        });
      });
  }
};

exports.update = (req, res) => {
  if (jwt.verify(req.body.token, secret_token)) {
    const id = req.params.id;

    Orders.update(req.body[0], {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "product was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating product with id=" + id
        });
      });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  if (jwt.verify(req.body.token, secret_token)) {
    const id = req.params.id;

    Orders.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "product was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete product with id=${id}. Maybe product was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete product with id=" + id
        });
      });
  }
};