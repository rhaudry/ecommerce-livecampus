const axios = require('axios');
let token = null

describe('Login User', () => {
    it('should return 200 OK', async () => {
        let response = null
        await axios.post('http://localhost:8080/api/users/login', {
            email: "romain@gmail.com",
            password: "salut"
        }).then((res) => {
            response = res;
            token = res.data.token;
        }, (error) => {
            console.log(error);
        });
        
        expect(response.status).toBe(200);
        expect(token).not.toBeNull();
    });
});



describe('Order controller', () => {
    // Créer une instance de base de données pour chaque test

    describe('POST /orders', () => {
        let response = null
        it('should create a new order', async () => {
            await axios.post('http://localhost:8080/api/orders', {
                token,
                user_Id: 1,
                product_id: 1,
                status: "pending",
                qty: 1
            }).then((res) => {
                response = res;
            }, (error) => {
                console.log(error);
            });

            // Vérifier que l'objet de commande a été créé dans la base de données
            expect(response).not.toBeNull();
            expect(response.status).toBe(200);
            console.log(response.data);
        });
    });
});

