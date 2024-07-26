import sequelize from '../database/client.js';
import { DataTypes, Model } from 'sequelize';

class Pokemons extends Model {}

Pokemons.init(
    {
        name:{
            type: DataTypes.TEXT,
            allowNull: false,
            unique:true,
        },
        
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        atk:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        def:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        atk_spe:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        def_spe:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        speed:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        tableName: 'pokemon'
    },

);

export default Pokemons;