
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    uid: {
        type: String,
        required: 'Uid required'
    },
    name: {
        type: String,
        required: 'Name required'
    },
    email: {
        type: String,
        required: 'Email required'
    },
    picture: {
        type: String,
        required: 'Picture required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    allowedTasks : {
        type: Number,
        default: 5
    },
    allowedGroups : {
        type: Number,
        default: 2
    }
});