const { response } = require("express");

const authorizedRole = (...roles) => {

    return (req, res = response, next) => {
        //Verificar si el token es valido
        if(!req.user){
            return res.status(500).json({
                msg: "Se requiere un token valido para continuar"
            });
        };
        
        //Verificar que el usuario sea admin
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `El rol ${req.user.role} no autorizado para realizar la petición`
            });
        };
    
        next();
    }

}

module.exports = {
    authorizedRole
}