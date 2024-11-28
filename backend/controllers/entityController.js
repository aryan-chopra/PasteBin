import { nanoid } from 'nanoid'
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes'

import Entity from '../models/entityModel.js'
import calculateExpirationDate from '../utils/calculateExpirationDate.js'

Entity.createEntity = async (request, response) => {
    try {
        const requestBody = request.body
        const expirationInterval = calculateExpirationDate(requestBody.expiresAfter)
        
        console.log(expirationInterval)
        if (expirationInterval == -1) {
            delete requestBody.expiresAfter
        } else {
            const expirationDate = new Date(Date.now() + expirationInterval)
            requestBody.expiresAfter = expirationDate
        }

        const newEntity = new Entity(
            {
                url: nanoid(10),
                ...requestBody
            }
        )

        await newEntity.save()
        
        response.status(StatusCodes.CREATED).json(
            {
                ...newEntity
            }
        )
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                message: "Failed to create entity ",
                error: error.name
            }
        )
    }
}

Entity.getEntity = async (request, response) => {
    const { entityId } = request.params
    try {
        const entity = await Entity.findOne({ url: entityId })
        if (entity) {
            response.status(StatusCodes.OK).json(
                {
                    data: entity 
                }
            )
        } else {
            response.status(StatusCodes.NOT_FOUND).json(
                {
                    error: "Entity not found"
                }
            )
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                message: error.name
            }
        )
    }
}

export default Entity