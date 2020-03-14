import * as mongoose from 'mongoose';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class GetTasksLimitUseCase {

    public verifyTaskLimit(uid: String, callback) {

        User.findOne({ 'uid': uid }, 'allowedTasks', (error, alllowed) => {
            if (error) {
                return callback(new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            else {
                Task.countDocuments({ 'ownerUid': uid }, (error, count) => {
                    if (error) {
                        return callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
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
} 