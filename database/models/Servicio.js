module.exports = (sequelize, DataTypes) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    };

    const config = {
        tableName: 'Servicios',
        timestamps: false
    };

    const Servicio = sequelize.define("Servicio", cols, config);
    return Servicio;
}