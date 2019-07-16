const { Schema, model } = require('mongoose');
// 创建用户的数据结构，并导出数据模型
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 12,
    }
})
module.exports = model('User', userSchema);
