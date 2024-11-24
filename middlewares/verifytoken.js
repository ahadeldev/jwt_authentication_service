import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ApiError from "../shared/apierror.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";

dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    const error = new ApiError("Access denied", httpStatusCodes.ACCESS_DENIED);
    return next(error);
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  if(!verifiedToken) {
    const error = new ApiError("Invalid token, Please login", httpStatusCodes.BAD_REQUSEST);
    return next(error);
  }
  req.user = verifiedToken;
  next();
}

export default verifyToken;