import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class UpdateTaskUseCase {

    public update(uid: String, id: String, taskModel, callback) {

        Task.findOneAndUpdate({ _id: id, ownerUid: uid }, taskModel, { new: true }, (error, task) => {
            if (error) {
                return callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            else {
                return callback(undefined, task);
            }
        });
    }
} 