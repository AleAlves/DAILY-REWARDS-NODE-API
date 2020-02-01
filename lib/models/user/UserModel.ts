
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firebaseID: {
        type: String,
        required: 'FirebaseID required'
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
    }
});