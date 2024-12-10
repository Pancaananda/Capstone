const { userRegister, userLogin, patchUserData, getUserData } = require('./handlerUser');
const authMiddleware = require('../middleware/auth');
const { getFoodDetection } = require('./handlerFood')

const routes = [
    {
        method: 'POST',
        path: '/register',
        handler: userRegister,
    },
    {
        method: 'POST',
        path: '/login',
        handler: userLogin,
    },
    /* POST edit data
    {
        method: 'POST',
        path: '/user/data',
        options: {
            pre: [{ method: authMiddleware }],
        },
        handler: fillUserData,
    },
    */
    {
        method: 'PATCH',
        path: '/user/data',
        options: {
            pre: [{ method: authMiddleware }],
        },
        handler: patchUserData,
    },
    {
        method: 'GET',
        path: '/user/data',
        options: {
            pre: [{ method: authMiddleware }],
        },
        handler: getUserData,
    },
    {
        method: 'POST',
        path: '/food/detect',
        options: {
            pre: [{ method: authMiddleware }],
        },
        handler: getFoodDetection,
    }
];

module.exports = routes;
