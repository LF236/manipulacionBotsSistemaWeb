module.exports = (sequelize, DataTypes) => {
    const cols = {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUID4,
            allowNull: false
        },

        direccionIP: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        nombreBot: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        hostname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    };

    const config = {
        tableName: 'Bots',
        timestamps: false,
    };

    const Bot = sequelize.define("Bot", cols, config);
    return Bot;
}