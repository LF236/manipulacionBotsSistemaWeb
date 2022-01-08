module.exports = (sequelize, DataTypes) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        usuario: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    };

    const config = {
        tableName: 'Usuarios',
        timestamps: false
    };

    const Usuario = sequelize.define("Usuario", cols, config);
    return Usuario;
}