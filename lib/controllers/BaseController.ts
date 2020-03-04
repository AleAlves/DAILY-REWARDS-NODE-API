
import { Response } from "express";
import { HTTPResponse } from "../models/http/HTTPResponse";
import { Status } from "../models/http/Status"
import { JWTSession } from "../security/JWT/model/JWTSession";
import { Logger } from '../tools/Logger'

export class BaseController {

    public constructor(){
        console.log()
    }

    public session(req){
        return new JWTSession(JSON.parse(JSON.stringify(req.params.session)))
    }

    public send(res: Response, data?: any, status?: Status, message?: String) {
        Logger.log(data, BaseController.name, "send")
        res.send(new HTTPResponse(data, status, message))
        return
    }

    public onError(res: Response, status?: Status, message?: String) {
        Logger.log(undefined, BaseController.name, "send")
        res.send(new HTTPResponse(undefined, status, message))
        return
    }

}