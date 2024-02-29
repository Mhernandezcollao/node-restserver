const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req, res = response, next) => {
    
    // const token = req.header('x-token')
    const bearer_token = req.headers.authorization;
    const bearer_token_split = bearer_token.split(' ');
    if (bearer_token_split.length !== 2) return res.json({ message: 'Autorización inválida, recuerde colocar el Bearer + Token' });
    const token = bearer_token_split[1];
    // console.log(token)

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //leer el usuario que corresponde al uid
        const user = await User.findById(uid)

        //Verificar si el usuario exite
        if(!user) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existente"
            })
        }

        //Verificar si el usuario no esta desactivado
        if(!user.status) {
            return res.status(401).json({
                msg: "Token no valido - usuario con estado false"
            })
        }

        
        
        req.user = user
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no valido"
        })
        
    }

}

module.exports = {
    validateJWT,
}