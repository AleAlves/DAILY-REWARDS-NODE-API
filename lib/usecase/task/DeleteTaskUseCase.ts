import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class DeleteTaskUseCase {

    public delete(id: String, callback) {

        Task.remove({ _id: id }, (error, task) => {
            if (error) {
                callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            else {
                callback(task)
            }
        });
    }
} 