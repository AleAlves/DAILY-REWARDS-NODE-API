import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { HTTPStatus } from '../../models/http/HTTPStatus';

import { TaskSchema } from '../../models/task/Task';
import { UserSchema } from '../../models/user/UserModel';

import { CryptoTools } from "../../security/CryptoTools";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { Logger } from '../../tools/Logger'

import { BaseController } from "../BaseController"

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);

export class TaskController extends BaseController {

    public add(req: Request, res: Response) {

        const token = new JWTSession(req.params.session);

        //encrypt
        //let token = CryptoTools.AES().decrypt(req.body.data, token)

        let taskModel = new Task(req.body.data)

        Logger.log(taskModel, TaskController.name, "add")

        User.findOne({ 'uid': token.uid }, 'allowedTasks', (error, alllowed) => {

            if(error){
                super.onError(res, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            else{
                taskModel.onwerUid = token.uid 
            }

            Task.countDocuments({ 'onwerUid': token.uid }, (error, count) => {

                if(error){
                    super.onError(res, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
                }

                if (count <= alllowed.allowedTasks){
                    taskModel.save((error, task) => {

                        if(error){
                            Logger.log(error, TaskController.name, "add - save")
                            super.onError(res,new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
                        }
                        else{
                            super.send(res, taskModel, undefined,  new HTTPStatus.SUCESS.CREATED)
                        }

                    })
                }
                else{
                    super.onError(res, new HTTPStatus.BUSINESS.TASKS_LIMIT_REACHED);
                }
            })
        })


    }

    public get(req: Request, res: Response) {
        Task.find({}, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public getByID(req: Request, res: Response) {
        Task.findById(req.params.taskID, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public update(req: Request, res: Response) {
        Task.findOneAndUpdate({ _id: req.params.taskID }, req.body, { new: true }, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public delete(req: Request, res: Response) {
        Task.remove({ _id: req.params.taskID }, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

}