import * as mongoose from 'mongoose';

import { HTTPStatus } from '../../models/http/HTTPStatus';

import { Logger } from '../../tools/Logger'

export class CreateGroupUseCase {

    public create(uid: String, groupModel, callback) {

        groupModel.onwerUid = uid

        groupModel.save((error, group) => {

            if (error) {
                Logger.log(error, CreateGroupUseCase.name, "saveGroup")
                return callback(error, new HTTPStatus.CLIENT_ERROR)
            }
            else {
                return callback(undefined, group)
            }
        })
    }
} 