
import { CryptoTools } from "../CryptoTools";
import { JWTType } from "../JWT/model/JWTType"
import { HTTPResponse } from "../../models/http/HTTPResponse"
import { HTTPStatus } from "../../models/http/HTTPStatus"

module.exports = (req, res, next) => {

  const token = req.headers['access-token'] || req.headers['session-token'];

  console.log("token: " + token);

  try {
    var rawToken = CryptoTools.JWT().instance().verify(token)
  } catch (error) {
    console.log("Verify Error: " + error)
    return res.send(new HTTPResponse(undefined, new HTTPStatus.CLIENT_ERROR.FORBIDDEN));
  }

  console.log("is login: " + token && String(req.originalUrl).includes('login'))

  console.log("Raw Token: " + JSON.stringify(rawToken))

  if (token && rawToken.type == JWTType.ACCESS && String(req.originalUrl).includes('login')) {
    CryptoTools.JWT().instance().verify(token, function (err, decoded) {
      if (err) {
        return res.status(401).send(new HTTPResponse(undefined, new HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
      }
      console.log("Raw Token decoded: " + JSON.stringify(decoded))
      req.params.access = JSON.parse(JSON.stringify(decoded));
      next();
    });
  }
  else if (token && rawToken.type == JWTType.SESSION) {
    CryptoTools.JWT().instance().verify(token, function (err, decoded) {
      if (err) {
        return res.status(401).send(new HTTPResponse(undefined, new HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
      }
      req.params.session = decoded;
      next();
    });
  }
  else {
    return res.send(new HTTPResponse(undefined, new HTTPStatus.CLIENT_ERROR.UNAUTHORIZED));
  }
}