

const {Schema, model} = require('mongoose')

const RoleScheme = Schema({
    role: {
        type: String,
        required: [true, "El rol es obligatorio"]
    }

})

module.exports = model('Role', RoleScheme)