
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Members = new Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    }

}, { usePushEach: true });

const Tasks = new Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }

}, { usePushEach: true });

export const GroupSchema = new Schema({

    members: [Members],

    tasks : [Tasks],

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