import { JWTType } from "../model/JWTType"

export class JWTSession {
    
    firebaseID: String
    userID: String
    AESIV: String
    AESKey: String
    AESSalt: String
    created: number
    type: JWTType

    constructor(clientAESData: any, type?: JWTType) {
        this.userID = clientAESData.id
        this.firebaseID = clientAESData.firebaseID
        this.AESIV = clientAESData.AESIV.replace(/(\r\n|\n|\r)/gm, "");
        this.AESKey = clientAESData.AESKey.replace(/(\r\n|\n|\r)/gm, "");
        this.AESSalt = clientAESData.AESSalt.replace(/(\r\n|\n|\r)/gm, "");
        this.created = Date.now()
        this.type = type
    }
}