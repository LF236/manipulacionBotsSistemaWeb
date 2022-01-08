module.exports = (sequelize, DataTypes) => {
    const cols = {
        id_usuario: {
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false,
            references: {
                model: 'Usuarios',
                key: 'id'
            }
        },

        token: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    };

    const config = {
        tableName: 'SesionUsuario',
        timestamps: false
    };

    const SesionUsuario = sequelize.define("SesionUsuario", cols, config);
    return SesionUsuario;
}