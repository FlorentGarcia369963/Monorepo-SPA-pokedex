import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';

class Types extends Model {}

Types.init(
    {
        name:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        color:{
            type: DataTypes.TEXT,
            allowNull: false,
        }

    },
    {
        sequelize,
        tableName: 'type'
    },

);

export default Types;