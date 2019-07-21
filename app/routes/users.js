const jwt = require('koa-jwt');
const { secret }  = require('../config');
const Router = require('koa-router');
const router = new Router({
    prefix: '/users'
});
const {
    find,
    findById,
    create,
    checkAuth,
    update,
    delele: del,
    login,
} = require('../controllers/user');
// 自己的jwt获取中间件
// const auth = async (ctx, next) => {
//     const { authorization = '' } = ctx.request.header;
//     const token = authorization.replace('Bearer ', '');
//     try {
//         const user = jsonwebtoken.verify(token, secret);
//         ctx.state.user = user;
//     } catch (error) {
//         ctx.throw(401, error.message);
//     }
//     await next();
// }
const auth = jwt({ secret });
router.get('/', find);
router.get('/:id', findById);
router.post('/', create);
router.patch('/:id', auth, checkAuth, update);
router.delete('/:id', auth, checkAuth, del);
router.post('/login', login);
module.exports = router;
