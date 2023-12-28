const getTokenFromHeader = (req) => {
    //get token from header
    const headerObj = req.headers;
  
    const token = headerObj["authorization"]?.split(" ")[1];
  
    if (token !== undefined) {
      return token;
    } else {
      return 'No token found in the header.'
    }
  };
  
 export default getTokenFromHeader
  