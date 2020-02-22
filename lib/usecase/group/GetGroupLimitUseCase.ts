import * as mongoose from 'mongoose';

import { GroupSchema } from '../../models/group/Group';
import { UserSchema } from '../../models/user/UserModel';
import { HTTPStatus } from '../../models/http/HTTPStatus';

const User = mongoose.model('User', UserSchema);
const Group = mongoose.model('Group', GroupSchema);

export class GetGroupLimitUseCase {

    public verifyGroupLimit(uid: String, callback) {

        User.findOne({ 'uid': uid }, 'allowedGroups', (error, alllowed) => {
            if (error) {
                return callback(new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
            }
            else {
                Group.countDocuments({ 'ownerUid': uid }, (error, count) => {
                    if (error) {
                        return callback(new HTTPStatus.CLIENT_ERROR.BAD_REQUEST)
                    }
                    else {
                        if (count <= alllowed.allowedGroups) {
                            let permission = true
                            return callback(undefined, permission)
                        }
                        else {
                            return callback(new HTTPStatus.BUSINESS.GROUPS_LIMIT_REACHED);
                        }
                    }
                })
            }
        })
    }
} 