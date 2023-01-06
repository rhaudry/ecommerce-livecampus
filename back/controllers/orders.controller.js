const { Sequelize, Op } = require("sequelize");
const getDb = require("../sequelize");

async function main() {
  const sequelize = await getDb();
  Orders = require("../models/modelOrders.js")(sequelize, Sequelize);
}
main();

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const orders = req.body;
  orders.forEach(element => {
    Orders.create(element)
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  });
  res.send({ message: "Done" });
};

exports.findAll = (req, res) => {
  Orders.findAll({

    where: req.body,
  })

    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred"
      });
    });
};

exports.update = (req, res) => {
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
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
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
};