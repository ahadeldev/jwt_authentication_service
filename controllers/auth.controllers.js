import ApiError from "../shared/apierror.js";
import httpStatusCodes from "../shared/httpstatuscodes.js"
import AuthServices from "../services/auth.services.js";

const authServices = new AuthServices();

class AuthControllers {

  // @desc    Register new user
  // @route   POST /api/v1/auth/register
  // @access  Public
  async registerController(req, res, next){
    const {name, email, username, password} = req.body
    
    // Check all fields.
    if(!name || !email || !username || !password){
      const error = new ApiError("# All fields required.", httpStatusCodes.BAD_REQUSEST);
      return next(error);
    }

    // Check if email exists.
    try {
      await authServices.checkEmail(email);
    } catch (err) {
      if (err instanceof ApiError) {
        const error = new ApiError(err.message, err.status);
        return next(error);  
      }
    }

    // Check if username exists
    try {
      await authServices.checkUsername(username);
    } catch (err) {
      if (err instanceof ApiError) {
        const error = new ApiError(err.message, err.status);
        return next(error);
      }
    }

    const newUser = await authServices.register(name, email, username, password);
    if(newUser === false) {
      const error = new ApiError("# Error wile creating user", httpStatusCodes.INTERNAL_SERVER_ERROR);
      return next(error);
    }
    res.status(httpStatusCodes.RESOURCE_CREATED).json(newUser); 
  }

  // @desc    Login user
  // @route   POST /api/v1/auth/login
  // @access  Public
  async loginController(req, res, next){
    const {username, password} = req.body;
    try {
      const loginUser = await authServices.login(username, password);
      res.status(httpStatusCodes.OK).json(loginUser);
    } catch (err) {
      const error = new ApiError(err.message, err.status);
      return next(error);
    } 
  }

  // @desc    User profile
  // @route   GET /api/v1/auth/profile
  // @access  Private
  async profileController(req, res, next){
    const id = req.user.id;
    try {
      const user = await authServices.profile(id);
      res.status(httpStatusCodes.OK).json(user);
    } catch (err) {
      return next(err.message, err.status);
    }
  }

  // @desc    Update user profile
  // @route   PUT /api/v1/auth/profile
  // @access  Private
  async profileUpdateController(req, res, next){
    const {newName, newEmail, newUsername, newPassword} = req.body
    const id = req.user.id;
    try {
      const user = await authServices.profileUpdate(id, newName, newEmail, newUsername, newPassword);
      res.status(httpStatusCodes.OK).json(user);
    } catch (err) {
      const error = new ApiError(err.message, err.status);
      return next(error);
    }
  }

  // @desc    Delete user profile
  // @route   DELETE /api/v1/auth/profile
  // @access  Private
  async deleteProfileController(req, res, next){
    const id = req.user.id;
    try {
      const delUser = await authServices.delete(id);
      res.status(httpStatusCodes.OK).json(delUser);
    } catch (err) {
      const error = new ApiError(err.message, err.status)
      return next(error)
    }
  }
}

export default AuthControllers;