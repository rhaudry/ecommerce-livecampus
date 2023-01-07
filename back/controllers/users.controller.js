const { Sequelize, Op } = require("sequelize");
const getDb = require("../sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function main() {
  const sequelize = await getDb();
  Users = require("../models/modelUsers.js")(sequelize, Sequelize);
}
main();

const saltRounds = 10;
exports.create = async (req, res) => {
  const body = req.body;
  try {
    if (body.length === 0) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    const users = body;
    try {
      await Promise.all(
        users.map(async (user) => {
          const hash = await bcrypt.hash(user.password, saltRounds);
          console.log("hash", hash)

          // ça va throw une erreur si problem => qui va stopper toutes les promises,
          // puis aller dans le try/catch
          await Users.create({
            ...user,
            password: hash
          });
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("fail to create users");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("INTERNAL ERROR");
  }
  res.status(200).send({ message: "Done" });
};

exports.findAll = (req, res) => {
  if (jwt.verify(req.body.token, 'privatekey')) {
    Users.findAll({

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
  }
};

exports.update = (req, res) => {
  if (jwt.verify(req.body.token, 'privatekey')) {
    const id = req.params.id;

    Users.update(req.body[0], {
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

exports.delete = (req, res) => {
  if (jwt.verify(req.body.token, 'privatekey')) {
    const id = req.params.id;

    Users.destroy({
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

exports.login = async (req, res) => {
  console.log("req", req.body);
  const data = await Users.findOne({
    where: { email: req.body.email }
  })
  console.log("data", data);
  try {
    if (!data) { throw new Error("user not found") }
    const result = await bcrypt.compare(req.body.password, data.password);
    console.log("result", result);
    const token = jwt.sign({ data }, 'privatekey', { expiresIn: '1h' });

    if (token) {
      console.log("token", token)
      res.status(200).send({
        message: "token envoyé ?",
        token
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "fail to login" });
  }
};