import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import  verifyToken from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify the token
    const decodedUser = verifyToken(token);
    //save the user into req obj
    req.userAuth = decodedUser?.id;
    if (!decodedUser) {
      return next("Invalid/Expired token, please login again", 500);
    } else {
      next();
    }
  };
  
export default isLoggedIn; 