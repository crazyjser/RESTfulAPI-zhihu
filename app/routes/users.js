const Router = require('koa-router');
const router = new Router({
    prefix: '/users'
});
let db = [{
    name: 'Susan',
    age: 21
}]
router.get('/', ctx => {
    ctx.body = db;
})
router.post('/', ctx => {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
})
module.exports = router;
