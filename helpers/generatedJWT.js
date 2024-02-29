const jwt = require("jsonwebtoken")

const generatedJWT = (uid = "") => {

    return new Promise( (resolve, reject) => {

        const payLoad = { uid };

        jwt.sign(payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '5h'
        }, (err, token) => {
            if(err) {
                console.log(err)
                reject('No se pudo generar el token')
            }else {
                resolve(token)
            }
        })
    }) 
}

module.exports = {
    generatedJWT
}