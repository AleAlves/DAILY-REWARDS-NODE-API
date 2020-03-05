import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const Task = mongoose.model('Task', TaskSchema);

export class GetTasksUseCase {

    public get(uid: String, callback) {

        Task.find({ 'uid': uid }, (error, tasks) => {
            if (error) {
                return callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            return callback(undefined, tasks)
        });
    }
} 