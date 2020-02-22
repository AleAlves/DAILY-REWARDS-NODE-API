import * as mongoose from 'mongoose';

import { GroupSchema } from '../../models/group/Group';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const Group = mongoose.model('Group', GroupSchema);

export class GetGroupsUseCase {

    public get(uid: String, callback) {

        Group.find({ 'ownerUid': uid }, (error, groups) => {
            if (error) {
                return callback(error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            return callback(groups)
        });
    }
} 