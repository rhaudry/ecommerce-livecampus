const request = require('supertest');
const app = require('../controllers/orders.controller.js');
const { Sequelize } = require("sequelize");
const getDb = require("../sequelize");

describe('Order controller', () => {
    // Créer une instance de base de données pour chaque test
    beforeEach(async () => {
        const sequelize = await getDb();
        Orders = require("../models/modelOrders.js")(sequelize, Sequelize);
        await sequelize.sync({ force: true });
    });

    describe('POST /orders', () => {
        it('should create a new order', async () => {
            // Envoyer une requête POST avec des données de commande
            const response = await request(app)
                .post('/orders')
                .send({
                    user_id: 1,
                    product_id: 1,
                    status: "pending",
                    qty: 1
                });

            // Vérifier que la réponse est 201 Created
            expect(response.status).toBe(201);

            // Vérifier que l'objet de commande a été créé dans la base de données
            const order = await Orders.findByPk(response.body.id);
            expect(order).not.toBeNull();
            expect(order.user_Id).toBe(1);
            expect(order.product_id).toBe(1);
            expect(order.status).toBe("pending");
            expect(order.qty).toBe(1);
        });
    });
});
