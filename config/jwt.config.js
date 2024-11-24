import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
  );
  return token;
}

export default generateToken;