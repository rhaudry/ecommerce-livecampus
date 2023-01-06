module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("products", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
    });
    return Products;

}