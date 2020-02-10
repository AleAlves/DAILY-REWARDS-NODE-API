import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { HTTPStatus } from '../../models/http/HTTPStatus';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';

import { CryptoTools } from "../../security/CryptoTools";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { Logger } from '../../tools/Logger'

import { BaseController } from "../BaseController"

import { AddTaskUseCase } from "../../usecase/task/AddTaskUseCase"

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class TaskController extends BaseController {

    public add(req: Request, res: Response) {

        let useCase = new AddTaskUseCase()

        const token = new JWTSession(req.params.session);

        //encrypt
        //let taskModel = CryptoTools.AES().decrypt(req.body.data, token)

        let taskModel = new Task(req.body.data)

        Logger.log(taskModel, TaskController.name, "add")

        useCase.verifyTaskLimit(token.uid, (error) => {

            if(error){
                super.onError(res, error);
            }
            else{
                useCase.saveTask(token.uid, taskModel, (error, task) => {

                    if(error){
                        super.onError(res, error);
                    }
                    else{
                        super.send(res, task ,new HTTPStatus.SUCESS.CREATED)
                    }
                })
            }
        })
    }

    public get(req: Request, res: Response) {
        Task.find({}, (error, task) => {
            if (error) {
                super.send(res, error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public getByID(req: Request, res: Response) {
        Task.findById(req.params.taskID, (error, task) => {
            if (error) {
                super.send(res, error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public update(req: Request, res: Response) {
        Task.findOneAndUpdate({ _id: req.params.taskID }, req.body, { new: true }, (error, task) => {
            if (error) {
                super.send(res, error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public delete(req: Request, res: Response) {
        Task.remove({ _id: req.params.taskID }, (error, task) => {
            if (error) {
                super.send(res, error, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

}