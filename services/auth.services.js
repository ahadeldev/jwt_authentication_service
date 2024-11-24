import bcrypt from "bcryptjs";
import ApiError from "../shared/apierror.js";
import UserModel from "../models/user.model.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";
import generateToken from "../config/jwt.config.js";

class AuthServices {

  // A method to check if email exists.
  async checkEmail(email){
    const dbEmail = await UserModel.findOne({where: {email: email}});
    if(dbEmail) {
      throw new ApiError("Email already exists", httpStatusCodes.BAD_REQUSEST);
    }
  }

  // A method to check if username exists
  async checkUsername(username){
    const dbUsername = await UserModel.findOne({where: {username: username}});
    if (dbUsername) {
      throw new ApiError("username already exists", httpStatusCodes.BAD_REQUSEST);
    }
  } 
  
  // A method to handle user registration
  async register(name, email, username, password){
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt); 
    const newUser = await UserModel.create({name, email, username, password: hashedPassword});
    if(!newUser){
      return {};
    }
    return newUser;
  }

  // A method to handle user login
  async login(username, password){
    const dbUser = await UserModel.findOne({where: {username: username}});
    if(!dbUser) {
      throw new ApiError("Wrong username", httpStatusCodes.BAD_REQUSEST);
    }

    const passwordMatch = await bcrypt.compare(password, dbUser.password);
    if(!passwordMatch){
      throw new ApiError("Wrong password", httpStatusCodes.BAD_REQUSEST);
    }
    const token = generateToken(dbUser);
    return {dbUser, token};
  }

  // A method to handle user login
  async profile(id){
    const user = await UserModel.findByPk(id, {attributes: {exclude: ["password"]}});
    if (!user) {
      throw new ApiError("User not found", httpStatusCodes.BAD_REQUSEST);
    }
    return user;
  }

  // A method to handle user profile update
  async profileUpdate(id, newName, newEmail, newUsername, newPassword){
    const user = await UserModel.findByPk(id);
    if(!user) {
      throw new ApiError("user not found", httpStatusCodes.BAD_REQUSEST);
    }
    user.name = newName || user.name;
    user.email = newEmail || user.email;
    user.username = newUsername || user.username;
    user.password = newPassword || user.password;
    const updatedUser = await user.save();
    if(!updatedUser){
      throw new ApiError("Error updating user info", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return updatedUser;
  }

  // A method to handle user profile delete
  async delete(id){
    const user = await UserModel.findByPk(id);
    if(!user){
      throw new ApiError("user not found", httpStatusCodes.BAD_REQUSEST);
    }

    const deletedUser = await user.destroy();
    if(!deletedUser){
      throw new ApiError("Error deleting user", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return `user ${id} deleted`;
  }
}

export default AuthServices;