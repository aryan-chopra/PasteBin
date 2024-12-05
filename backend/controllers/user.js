import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import User from "../models/user.js";

User.create = async (request, response) => {
  const { email, username, password } = request.body;

  try {
    const duplicateEmail = await User.findOne({ email: email });
    const duplicateUsername = await User.findOne({ username: username });

    if (duplicateEmail) {
      return response
        .status(StatusCodes.CONFLICT)
        .json({ message: "An account already exists under this email" });
    }

    if (duplicateUsername) {
      return response
        .status(StatusCodes.CONFLICT)
        .json({ message: "This username is taken, please try another" });
    }

    const user = new User({
      username: username,
      password: password,
      email: email,
    });

    await user.save();

    response
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

User.authenticate = async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username: username }).select("password");
    
    if (!user.password) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid username or password" });
    }

    return response
      .status(StatusCodes.OK)
      .json({ message: "Authentication successful" });
  } catch (err) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
    console.error(err);
  }
};

export default User;
