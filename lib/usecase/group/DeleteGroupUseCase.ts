import * as mongoose from 'mongoose';

import { GroupSchema } from '../../models/group/Group';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const Group = mongoose.model('Group', GroupSchema);

export class DeleteGroupUseCase {

    public delete(uid: String, id: String, callback) {

        Group.remove({ _id: id, ownerUid: uid }, (error, task) => {
            if (error) {
                callback(error, new HTTPStatus.CLIENT_ERROR)
            }
            else {
                callback(undefined, task)
            }
        });
    }
} 