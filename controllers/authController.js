import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";


export const registerController = async (req, res) => {

  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    // checking existing user
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    // hashedpassword

    const hashedPasswrod = await hashpassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPasswrod,
      
    }).save()

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });




  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }

}

//  export default registerController






// ROUTE 2: Login a User using POST "/api/auth/login". No login required

export const loginController = async (req, res) => {



  try {

    const { email, password } = req.body;


    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Email Validation
    if (!email.includes("@")) {
      return res.status(400).send({
        success: false,
        message: "please Enter Correct email",
      });
    }

    // Find Unique User with email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }

    // Matching user password to hash password with bcrypt.compare()
    const doMatch = await bcrypt.compare(password, user.password);

    if (!doMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
     token: token,
    });
  }

  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    })
  }


}