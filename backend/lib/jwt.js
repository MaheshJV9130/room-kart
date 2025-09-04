import jwt from "jsonwebtoken";

export const getJWT = (data) => {
  const token = jwt.sign(data, process.env.PRIVATE_KEY);
  return token
};
