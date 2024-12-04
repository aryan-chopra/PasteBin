import mongoose from "mongoose";
import User from "../models/user.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

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
    console.error(err)
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export default User;