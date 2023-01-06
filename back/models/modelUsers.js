module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        privilege: {
            type: DataTypes.INTEGER
        },
    });
    return Users;

}