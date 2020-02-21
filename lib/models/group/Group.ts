
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GroupSchema = new Schema({

    members: [String],

    ownerUid: {
        type: String,
        required: 'Owner uid required'
    },
    allowedMembers : {
        type: Number,
        default: 10
    },
    name: {
        type: String,
        required: 'Group name required'
    },
    picture: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});