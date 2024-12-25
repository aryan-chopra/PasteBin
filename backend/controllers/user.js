import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import User from "../models/user.js";
import Entity from "../models/entity.js";

dotenv.config();

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

    if (!user || !user.password) {
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

    const jwtSecret = process.env.JWT_SECRET;
    const token = jsonwebtoken.sign(
      { userId: user._id, email: user.email },
      jwtSecret,
      { expiresIn: "1h" },
    );

    return response
      .status(StatusCodes.OK)
      .json({ token, message: "Authentication successful" });
  } catch (err) {
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
    console.error(err);
  }
};

User.getAllEntities = (request, response) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Not token is provided" });
  }

  const token = authHeader.split(" ")[1];

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decodedData) => {
      if (err) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "The token is invalid" });
      }
      try {
        const creator = await User.findById(decodedData.userId);
        const entities = await Promise.all(
            Object.values(creator.entities).map(id => Entity.findById(id))
        )
        return response
          .status(StatusCodes.OK)
          .json({ message: "Valid token", data: entities });
      } catch (err) {
        response
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Error fetching data" });
        console.log(err);
      }
    },
  );
};

export default User;
