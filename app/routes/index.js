const fs = require('fs');
module.exports = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === 'index.js') return false;
        let router = require(`./${file}`);
        app.use(router.routes()).use(router.allowedMethods())
    })
}