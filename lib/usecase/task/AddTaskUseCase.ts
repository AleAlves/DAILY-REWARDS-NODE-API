import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

import { Logger } from '../../tools/Logger'

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class AddTaskUseCase {

    public saveTask(uid: String, taskModel, callback) {

        taskModel.onwerUid = uid

        taskModel.save((error, task) => {

            if (error) {
                Logger.log(error, AddTaskUseCase.name, "saveTask")
                return callback(new HTTPStatus.BUSINESS.TASKS_LIMIT_REACHED)
            }
            else {
                return callback(undefined, task)
            }
        })
    }
} 