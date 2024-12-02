import { nanoid } from 'nanoid'
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes'

import Entity from '../models/entityModel.js'
import calculateExpirationDate from '../utils/calculateExpirationDate.js'

Entity.createEntity = async (request, response) => {
    try {
        const entityObject = {
            url: nanoid(10),
            ...(request.body),
            burnAfterRead: false
        }

        if (entityObject.expiresAfter.expiryDuration <= 0) {
            throw new Error("expiresAfter should be a natural number")
        }

        const expirationInterval = calculateExpirationDate(
            Number(entityObject.expiresAfter.expiryDuration),
            entityObject.expiresAfter.expiryPeriod
        )

        if (expirationInterval == -1) {
            delete entityObject.expiresAfter

            console.log("This entity will never expire")
        } else if (expirationInterval == 0) {
            delete entityObject.expiresAfter
            entityObject.burnAfterRead = true

            console.log("This entity will expire after one read")
        } else {
            const expirationDate = new Date(Date.now() + expirationInterval * 1000)
            entityObject.expiresAfter = expirationDate

            console.log("This entity will expire on", expirationDate.toLocaleDateString())
        }

        const newEntity = new Entity({ ...entityObject })

        newEntity.save()
            .then(() => {
                console.log("Created new entity", entityObject)
                response.status(StatusCodes.CREATED).json({ url: entityObject.url })
            })
            .catch((error) => {
                console.log(error.message)
                response.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
            })

    } catch (error) {
        console.error(error.message)
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                message: "Failed to create entity",
                error: error.message
            }
        )
    }
}

Entity.getEntity = async (request, response) => {
    const { entityId } = request.params
    try {
        const entity = await Entity.findOne({ url: entityId })
        if (entity) {
            if (entity.burnAfterRead) {
                Entity.findOneAndDelete({ _id: entity._id })
                    .then(deletedEntity => {
                        response.status(StatusCodes.OK).json({ data: deletedEntity })
                        console.log("Entity was set to Burn After Read, it has now been deleted")
                    })
                    .catch(error => {
                        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.name })
                        console.log(error.name)
                    })
            } else {
                response.status(StatusCodes.OK).json({ data: entity })
            }
        } else {
            response.status(StatusCodes.NOT_FOUND).json({ error: "Entity not found" })
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.name })
    }
}

export default Entity