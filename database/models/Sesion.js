module.exports = (sequelize, DataTypes) => {
    const cols = {
        id_bot: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false,
            references: {
                model: 'Bots',
                key: 'id'
            }
        },

        token: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    };

    const config = {
        tableName: 'Sesiones',
        timestamps: false
    };

    const Sesion = sequelize.define("Sesion", cols, config);
    return Sesion;
}