import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken";

import Entity from "../models/entity.js";
import User from "../models/user.js";
import calculateExpirationDate from "../utils/calculateExpirationDate.js";

Entity.createEntity = async (request, response) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];

    let userId = null;
    if (token) {
      console.log("token detcted");
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId);
      userId = decoded.userId;
    }

    const entityObject = {
      url: nanoid(10),
      ...request.body,
      burnAfterRead: false,
      createdBy: userId || null,
    };

    const expirationInterval = calculateExpirationDate(
      Number(entityObject.expiresAfter.expiryDuration),
      entityObject.expiresAfter.expiryPeriod,
    );

    switch (expirationInterval) {
      case -1:
        delete entityObject.expiresAfter;
        console.log("This entity will never expire");
        break;
      case 0:
        delete entityObject.expiresAfter;
        entityObject.burnAfterRead = true;
        console.log("This entity will expire after one read");
        break;
      default:
        const expirationDate = new Date(Date.now() + expirationInterval * 1000);
        entityObject.expiresAfter = expirationDate;
        console.log(
          "This entity will expire on",
          expirationDate.toLocaleDateString(),
        );
    }

    const newEntity = new Entity({ ...entityObject });

    await newEntity.save();

    if (userId) {
      const user = await User.findById(userId);
      console.log(userId);
      if (user) {
        user.entities.push(newEntity._id);
        console.log("added to the entity list");
        await user.save();
      }
    }

    console.log("Created new entity", entityObject);
    response.status(StatusCodes.CREATED).json({ url: entityObject.url });
  } catch (error) {
    console.error(error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

Entity.getEntity = async (request, response) => {
  const { entityId } = request.params;
  try {
    const entity = await Entity.findOne({ url: entityId });
    if (!entity) {
      response
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Entity not found" });
      return;
    }
    if (entity.burnAfterRead) {
      console.log("Entity is set to Brun After Read");
      const result = await Entity.deleteOne({ _id: entity._id });
      if (result.deletedCount == 0) {
        console.error("Something went wrong, deletion failed");
      } else {
        console.log("Entity deleted successfully");
      }
    }
    response.status(StatusCodes.OK).json({ data: entity });
  } catch (error) {
    console.log(error.message);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

Entity.editEntity = async (request, response) => {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const pasteURL = request.params.entityId;
    const { title, content, contentType, expiresAfter } = request.body;

    if (!title || !content || !contentType || !expiresAfter) {
      return response.status(StatusCodes.BAD_REQUEST).json({
        message: "title, content, contentType and expiresAfter are required",
      });
    }

    const entity = await Entity.findOne({ url: pasteURL });

    if (!entity) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entity does not exist" });
    }

    if (entity.createdBy.toString() !== userId) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are not autorized to edit this entity" });
    }

    entity.title = title;
    entity.content = content;
    entity.contentType = contentType;

    const expirationInterval = calculateExpirationDate(
      Number(expiresAfter.expiryDuration),
      expiresAfter.expiryPeriod,
    );

    switch (expirationInterval) {
      case -1:
        delete entity.expiresAfter;
        break;
      case 0:
        delete entity.expiresAfter;
        entity.burnAfterRead = true;
        break;
      default:
        const expirationDate = new Date(Date.now() + expirationInterval * 1000);
        entity.expiresAfter = expirationDate;
    }

    try {
      await entity.save();
      response
        .status(StatusCodes.OK)
        .json({ message: "Entity edited successfully" });
    } catch (error) {
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Unable to write changes to the database",
      });
    }
  } catch (error) {
    console.log(error);
    return response
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "User is not authorized to make these changes" });
  }
};
export default Entity;
