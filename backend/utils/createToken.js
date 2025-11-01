import jwt from "jsonwebtoken";

export const createToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign({ id }, jwtSecret);
};
