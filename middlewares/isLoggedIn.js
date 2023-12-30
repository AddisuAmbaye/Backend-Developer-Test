import getTokenFromHeader from "../utils/getTokenFromHeader.js"
import  verifyToken from "../utils/verifyToken.js"

export const isLoggedIn = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req)
  //verify the token
  const decodedUser = verifyToken(token)
  //save the user into req obj
  req.userAuth = decodedUser?.id
  if (!decodedUser) {
    return res.status(500).json("Invalid/Expired token, please login again")
  }
  next()
}
  
export default isLoggedIn