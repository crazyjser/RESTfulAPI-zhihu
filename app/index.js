const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routing = require('./routes');
const error = require('koa-json-error');
const parameter = require('koa-parameter');
const mongoose = require('mongoose');
const { connectionStr } = require('./config');

mongoose.connect(connectionStr, { useNewUrlParser: true }, () => {
    console.log('mongoDB链接成功')
});
mongoose.connection.on('error', console.error)

const app = new Koa();

// 自定义错误处理的中间件
// app.use(async (ctx, next) => {
//     try {
//         await next();
//     } catch (error) {
//        ctx.status = error.status || error.statusCode || 500;
//        ctx.body = {
//            message: error.message,
//        };
//     }
// })
app.use(error({
    postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'development' ? {stack, ...rest} : {...rest},
}));
app.use(bodyParser());
app.use(parameter(app))

routing(app);

app.listen(3000, () => {
    console.log('服务已启动于3000端口')
})
