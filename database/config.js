const { default: mongoose } = require("mongoose")
const moongoose = require("mongoose")

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN );

        console.log("Base de datos online");


    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar la base datos");
    }
}

module.exports = {
    dbConnection
}