const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');


const userGet = async (req = request, res = response) => {

    const query = { status: true };
    const users = await User.find(query);

    res.json(users);
}

const userPost = async (req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role})

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt)

    //Guardar en base de datos
    await user.save();

    res.json({
        msg: 'Se creo el usuario exitosamente',
        user
    });
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, email, password, create_by_google, ...resto} = req.body

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'Se actulizo el usuario exitosamente',
        user
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    await User.findByIdAndUpdate( id, { status: false } );

    res.json({
        msg: `Se ha eliminado el usuario con el id: ${id}`
    });
}




module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}