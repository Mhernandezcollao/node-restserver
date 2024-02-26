
const { Schema, model} = require('mongoose')

const UserShema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE"]
    },
    status: {
        type: Boolean,
        default: true,
    },
    create_by_google: {
        type: Boolean,
        default: false,
    },

});

UserShema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model("User", UserShema);