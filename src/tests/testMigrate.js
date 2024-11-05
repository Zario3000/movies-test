require('../models')
//const app = require('./app');
const sequelize = require('../utils/connection');



const testMigrate = async () => {
    try {
       await sequelize.sync({force: true});
        console.log("Database reset ✅");
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate();
