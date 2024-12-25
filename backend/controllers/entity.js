import { nanoid } from "nanoid";
import mongoose from "mongoose";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import jsonwebtoken from "jsonwebtoken"

import Entity from "../models/entity.js";
import User from "../models/user.js"
import calculateExpirationDate from "../utils/calculateExpirationDate.js";

Entity.createEntity = async (request, response) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];

    let userId = null;
    if (token) {
        console.log("token detcted")
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(decoded.userId)
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
        const user = await User.findById(userId)
        console.log(userId)
        if (user) {
            user.entities.push(newEntity._id);
            console.log("added to the entity list")
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
    const { entityId } = request.params
    try {
        const entity = await Entity.findOne({ url: entityId })
        if (!entity) {
            response.status(StatusCodes.NOT_FOUND).json({ error: "Entity not found" })
            return
        }
        if (entity.burnAfterRead) {
            console.log("Entity is set to Brun After Read")
            const result = await Entity.deleteOne({ _id: entity._id })
            if (result.deletedCount == 0) {
                console.error("Something went wrong, deletion failed")
            } else {
                console.log("Entity deleted successfully")
            }
        }
        response.status(StatusCodes.OK).json({ data: entity })
    } catch (error) {
        console.log(error.message)
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
};

export default Entity;
