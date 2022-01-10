module.exports = (sequelize, DataTypes) => {
    const cols = {
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        id_bot: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false,
            references: {
                model: 'Bots',
                key: 'id'
            }
        },

        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };

    const config = {
        tableName: 'ServicioBot',
        timestamps: false
    };

    const ServicioBot = sequelize.define("ServicioBot", cols, config);
    return ServicioBot;
}