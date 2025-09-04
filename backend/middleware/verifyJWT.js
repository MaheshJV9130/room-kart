import jwt from 'jsonwebtoken'
export const verifyJWT = (req, res, next) => {
  const token = req.cookies.session;
  try{
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded;
    next();
  }catch(error){
    res.clearCookie("sessionId");
    res.json({ status: 404, message: error });
  }
};
