module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("orders", {
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        status: {
            type: DataTypes.STRING
        },
        qty: {
            type: DataTypes.INTEGER
        },
    });
    return Orders;

}