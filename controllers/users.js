const { response, request } = require('express');


const userGet = (req = request, res = response) => {

    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        name,
        apikey,
        page, 
        limit
    });
}

const userPost = (req, res = response) => {

    const { name, age } = req.body;

    res.json({
        msg: 'post API - usuariosPost',
        name, 
        age
    });
}

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete,
}
