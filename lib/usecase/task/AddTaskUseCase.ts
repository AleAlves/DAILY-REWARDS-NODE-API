import * as mongoose from 'mongoose';

import { TaskSchema } from '../../../models/task/Task';
import { UserSchema } from '../../../models/user/UserModel';
import { HTTPStatus } from '../../../models/http/HTTPStatus';

import { Logger } from '../../../tools/Logger'

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export interface Callback {

    onError(status: HTTPStatus)

    onResponse(data?: any, status?: HTTPStatus)
}

export class AddTaskUseCase {

    public verifyTaskLimit(uid: String, callback) {

        User.findOne({ 'uid': uid }, 'allowedTasks', (error, alllowed) => {
            if (error) {
                return callback(new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            else {
                Task.countDocuments({ 'onwerUid': uid }, (error, count) => {
                    if (error) {
                        return callback(new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
                    }
                    else {
                        if (count <= alllowed.allowedTasks) {
                            let permission = true
                            return callback(undefined, permission)
                        }
                        else {
                            return callback(new HTTPStatus.BUSINESS.TASKS_LIMIT_REACHED);
                        }
                    }
                })
            }
        })
    }

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