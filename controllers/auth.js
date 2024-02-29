const { response } = require("express")
const bcryptjs = require("bcryptjs")

const User = require('../models/user')
const { generatedJWT } = require("../helpers/generatedJWT")

const login = async ( req, res = response) => {

    const {email, password} = req.body
    
    //Verificar si el email existe
    const user = await User.findOne({ email })    
    if(!user) {
        return res.status(400).json({
            msg: "Usuario no exite"
        });
    } 

    //Si el usuario está activo
    if(!user.status) {
        return res.status(400).json({
            msg: "El usuario no está actualmente activo, ponte en contacto con soporte"
        });
    } 
    
    //Verificar la contraseña conside con el email
    const validPassword = bcryptjs.compareSync(password, user.password)
    if(!validPassword) {
        return res.status(400).json({
            msg: "Contraseña errónea"
        });
    } 

    //Generar JWT
    const token = await generatedJWT(user.id)

    try {
        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "No se pudo iniciar sesión, Hable con el administrador"
        })
        
    }
}

module.exports = {
    login,
}