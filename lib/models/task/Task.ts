
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const weekly = new Schema({

    weekly: {
        type: Boolean,
        required: true
    },
    dayOfWeek: {
        type: Number,
        required: false
    }

}, { usePushEach: true });

const monthly = new Schema({

    monthly: {
        type: Boolean,
        required: true
    },
    dayOfMonth: {
        type: Number,
        required: false
    }

}, { usePushEach: true });

const recurrence = new Schema({
    daily: {
        type: Boolean,
        required: true
    },
    weekly: [weekly],

    monthly: [monthly]

}, { usePushEach: true });

export const TaskSchema = new Schema({
    uid: {
        type: String,
        required: 'FirebaseID required'
    },
    name: {
        type: String,
        required: 'Name required'
    },
    description: {
        type: String,
        required: 'Email required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    goal: {
        type: Number,
        default: Date.now
    },
    deadLine: {
        type: Date,
        default: Date.now
    },
    recurrence: [recurrence]

}, { usePushEach: true });