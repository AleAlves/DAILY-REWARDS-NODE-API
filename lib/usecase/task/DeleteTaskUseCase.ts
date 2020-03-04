import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class DeleteTaskUseCase {

    public delete(uid: String, id: String, callback) {

        Task.remove({ _id: id, onwerUid: uid }, (error, task) => {
            if (error) {
                callback(error)
            }
            else {
                callback(task)
            }
        });
    }
} 