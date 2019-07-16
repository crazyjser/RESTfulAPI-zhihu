const User = require('../models/users');
class UserCtrl {
    constructor() {}
    async find(ctx) {
        let users = await User.find();
        ctx.body = users;
    }
    async findById(ctx) {
        let user = await User.findById(ctx.params.id);
        if (!user) ctx.throw('404', '用户不存在');
        ctx.body = user;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                require: true,
            },
            age: {
                type: 'number',
                require: false,
            }
        })
        let user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async update(ctx) {
        let user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        if (!user) ctx.throw('404', '用户不存在');
        ctx.body = user;
    }
    async delele(ctx) {
        let user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) ctx.throw('404', '用户不存在');
        ctx.status = 204;
    }
}

module.exports = new UserCtrl()
