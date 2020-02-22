import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { HTTPStatus } from '../../models/http/HTTPStatus';
import { GroupSchema } from '../../models/group/Group';

import { BaseController } from "../BaseController";

import { JWTSession } from "../../security/JWT/model/JWTSession";

import { CreateGroupUseCase } from "../../usecase/group/CreateGroupUseCase"
import { GetGroupLimitUseCase } from "../../usecase/group/GetGroupLimitUseCase"
import { GetGroupsUseCase } from "../../usecase/group/GetGroupsUseCase"

const Group = mongoose.model('Group', GroupSchema);

export class GroupController extends BaseController {

    public create(req: Request, res: Response) {

        let createUseCase = new CreateGroupUseCase()
        let limitUseCase = new GetGroupLimitUseCase()

        const token = new JWTSession(req.params.session);

        limitUseCase.verifyGroupLimit(token.uid, (error) => {

            if(error){
                super.onError(res, error);
            }
            else{
                let groupModel = Group(JSON.parse(JSON.stringify(req.body.data)))

                createUseCase.create(token.uid, groupModel, (error, task) => {
                    if(error){
                        super.onError(res, error);
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
                super.send(res, error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            else {
                super.send(res, groups);
            }
        })
    }

    public update(req: Request, res: Response) {

    }

    public delete(req: Request, res: Response) {

    }
}