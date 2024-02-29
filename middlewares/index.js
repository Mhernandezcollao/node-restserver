const validateFields = require('../middlewares/validate-fields')
const validateJWT = require('../middlewares/validate-jwt');
const authorizedRole = require('../middlewares/authorized-role');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...authorizedRole
}
