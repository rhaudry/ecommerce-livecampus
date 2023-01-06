const { Sequelize } = require("sequelize");
const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes");
const async = require("async");
const getDb = require("./sequelize");


async function main() {
    const sequelize = await getDb();
    Products = require("./models/modelProducts.js")(sequelize, Sequelize);
    Users = require("./models/modelUsers.js")(sequelize, Sequelize);
    Orders = require("./models/modelOrders.js")(sequelize, Sequelize);

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    const corsOptions = {
        origin: "http://localhost:3000"
    };
    app.use(cors(corsOptions));
    // parse requests of content-type - application/json
    app.use(express.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));
    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to my cool app !" });
    });
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    route(app);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

}
main().catch((e) => console.error(e))

