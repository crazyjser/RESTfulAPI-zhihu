const User = require('../models/users');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../config');
class UserCtrl {
    constructor() {}
    async find(ctx) {
        let users = await User.find();
        ctx.body = users;
    }
    async findById(ctx) {
        let user = await User.findById(ctx.params.id);
        if (!user) ctx.throw(404, '用户不存在');
        ctx.body = user;
    }
    async create(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            },
            age: {
                type: 'number',
                required: false,
            }
        })
        let { name } = ctx.request.body;
        let repeatUser = await User.findOne({ name });
        if (repeatUser) ctx.throw(409, '用户名已被占用');
        let user = await new User(ctx.request.body).save();
        ctx.body = user;
    }
    async checkAuth (ctx, next) {
        if (ctx.params.id !== ctx.state.user._id) {
            ctx.throw(401, '没有权限');
        }
        await next();
    }
    async update(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: false,
            },
            password: {
                type: 'string',
                required: false,
            },
        })
        let user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
        if (!user) ctx.throw('404', '用户不存在');
        ctx.body = user;
    }
    async delele(ctx) {
        let user = await User.findByIdAndRemove(ctx.params.id);
        if (!user) ctx.throw('404', '用户不存在');
        ctx.status = 204;
    }
    async login(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true,
            },
            password: {
                type: 'string',
                required: true,
            },
        })
        let user = await User.findOne(ctx.request.body);
        if (!user) ctx.throw(401, '用户名或者密码错误');
        let { _id, name } = user;
        let token = jsonwebtoken.sign({ _id, name }, secret, {expiresIn: '1d'});
        ctx.body = { token };
    }
}

module.exports = new UserCtrl()
