const { Sequelize, Op } = require("sequelize");
require('dotenv').config({ debug: true, path: __dirname + "/../.env" })
const secret_token = process.env.SECRET_TOKEN;
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
    if (body.length === 0 && !body && !body[0]) {
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
          await Users.create({
            ...user,
            password: hash
          });
        })
      );
      res.status(200).send({ message: "Done" });
    } catch (error) {
      console.error(error);
      res.status(500).send("fail to create users");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("INTERNAL ERROR");
  }
};

exports.findAll = (req, res) => {
  if (jwt.verify(req.body.token, secret_token)) {
    Users.findAll({

      where: req.body.user_id,
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
  if (jwt.verify(req.body.token, secret_token)) {
    const id = req.params.id;
    (async () => {
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      Users.update({
        ...req.body,
        password: hash
      }, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "user was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot user product with id=${id}. Maybe product was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating product with id=" + id
          });
        });
    })()
  }
};

exports.delete = (req, res) => {
  if (jwt.verify(req.body.token, secret_token)) {
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

  const data = await Users.findOne({
    where: { email: req.body.email }
  })
  try {
    if (!data) { throw new Error("user not found") }
    const result = await bcrypt.compare(req.body.password, data.password);
    const token = jwt.sign({ data }, secret_token, { expiresIn: '1h' });

    if (token) {
      res.status(200).send({
        user: {
          id: data.id,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          privilege: data.privilege,
        },
        token
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "fail to login" });
  }
};