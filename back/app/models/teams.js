import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';

class Teams extends Model {}

Teams.init(
    {
        name:{
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        description:{
            type: DataTypes.TEXT,
        }

    },
    {
        sequelize,
        tableName: 'team'
    },

);

export default Teams;