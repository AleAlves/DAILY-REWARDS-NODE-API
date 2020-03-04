import * as mongoose from 'mongoose';

import { GroupSchema } from '../../models/group/Group';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const Group = mongoose.model('Group', GroupSchema);

export class UpdateGroupUseCase {

    public update(id: String, taskModel, callback) {

        Group.findOneAndUpdate({ _id: id }, taskModel, { new: true }, (error, task) => {
            if (error) {
                return callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            else {
                return callback(task);
            }
        });
    }
} 