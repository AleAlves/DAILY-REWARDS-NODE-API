
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const GroupSchema = new Schema({

    membersId: [String],

    tasksId : [String],

    ownerUid: {
        type: String,
        required: 'Owner uid required'
    },
    allowedMembers : {
        type: Number,
        default: 10
    },
    title: {
        type: String,
        required: 'Group name required'
    },
    description: {
        type: String,
        required: 'Group description required'
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