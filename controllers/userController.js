const userModel = require("../models/userModel");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already exist",
      });
    }

    //save new user
    const user = new userModel({ username, email, password });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

//get all users
exports.getAllUsers = () => {};

//login user
exports.loginController = () => {};
