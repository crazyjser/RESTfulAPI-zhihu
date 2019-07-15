const db = [{
    name: 'Susan',
    age: 21
}]
class UserCtrl {
    constructor() {}
    find(ctx) {
       ctx.body = db; 
    }
    findById(ctx) {
        let user = db[ctx.params.id];
        if (user) {
            ctx.body = user;
        } else {
            ctx.body = {}
        }
    }
    create(ctx) {
        db.push(ctx.request.body)
        ctx.body = ctx.request.body;
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body;
    }
    delele(ctx) {
        db.splice(ctx.params.id * 1, 1);
        ctx.status = 204;
    }
}

module.exports = new UserCtrl()
