const Role = require('../models/role');
const User = require('../models/user');


const isRoleValid = async (role = '') => {

    const existRole = await Role.findOne({role})
    if(!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`)
    }

}

const isEmailRegistered = async (email = '') => {

    const emailExists = await User.findOne({ email })
    if(emailExists) {
        throw new Error(`El email ${email}, ya esta registrado en la base de datos`)
    }

}

const existUserById = async (id) => {

    const idExists = await User.findById(id)
    if(!idExists) {
        throw new Error(`El id ${id}, no esta registrado en la base de datos`)
    }

}


module.exports = {
    isRoleValid,
    isEmailRegistered,
    existUserById
}