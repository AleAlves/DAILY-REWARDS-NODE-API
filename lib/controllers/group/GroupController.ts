import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { HTTPStatus } from '../../models/http/HTTPStatus';
import { GroupSchema } from '../../models/group/Group';

import { BaseController } from "../BaseController";

import { JWTSession } from "../../security/JWT/model/JWTSession";

import { CreateGroupUseCase } from "../../usecase/group/CreateGroupUseCase"
import { GetGroupLimitUseCase } from "../../usecase/group/GetGroupLimitUseCase"
import { GetGroupsUseCase } from "../../usecase/group/GetGroupsUseCase"
import { UpdateGroupUseCase } from "../../usecase/group/UpdateGroupUseCase"
import { DeleteGroupUseCase } from "../../usecase/group/DeleteGroupUseCase"

const Group = mongoose.model('Group', GroupSchema);

export class GroupController extends BaseController {

    public create(req: Request, res: Response) {

        let createUseCase = new CreateGroupUseCase()
        let limitUseCase = new GetGroupLimitUseCase()

        const token = new JWTSession(req.params.session);

        limitUseCase.verifyGroupLimit(token.uid, (error) => {

            if(error){
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else{
                let groupModel = Group(JSON.parse(JSON.stringify(req.body.data)))

                createUseCase.create(token.uid, groupModel, (error, task) => {
                    if(error){
                        super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
                    }
                    else{
                        super.send(res, task, new HTTPStatus.SUCESS.CREATED)
                    }
                })
            }
        })
    }

    public get(req: Request, res: Response) {

        let getUseCase = new GetGroupsUseCase()
        
        const token = new JWTSession(req.params.session);

        getUseCase.get(token.uid, (error, groups) => {
            if (error) {
                super.onError(res, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST, error);
            }
            else {
                super.send(res, groups);
            }
        })
    }

    public update(req: Request, res: Response) {
        let updateGroupkUseCase = new UpdateGroupUseCase()

        updateGroupkUseCase.update(req.params.groupID, req.body, (error, task) => {
            if (error) {
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else {
                super.send(res, task)
            }
        })
    }

    public delete(req: Request, res: Response) {

        let deleteTaskUseCase = new DeleteGroupUseCase()

        deleteTaskUseCase.delete(req.params.taskID, (error, task) => {
            if (error) {
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else {
                super.send(res, task)
            }
        })
    }
}