import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default Users;