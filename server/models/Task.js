const mongoose = require('mongoose');
const {Schema} = mongoose;

/*
- authorId
- body
- createdAt
- deadline
- status
*/

const taskSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;