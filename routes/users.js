
const { Router } = require('express');
const { check } = require('express-validator');

const { isRoleValid, isEmailRegistered, existUserById } = require('../helpers/db-validators');

const { authorizedRole, validateJWT, validateFields } = require('../middlewares');

const { userGet,
        userPut,
        userPost,
        userDelete,
        userPatch } = require('../controllers/users');

const router = Router();

router.get('/', userGet );

router.post('/', [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    check("email", "El email no es válido").isEmail(),
    check("email").custom(isEmailRegistered),
    // check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields
], userPost );

router.put('/:id',  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isRoleValid),
    validateFields
],  userPut );

router.delete('/:id', [
    validateJWT,
    authorizedRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existUserById),
], userDelete );

router.patch('/', userPatch );

module.exports = router;