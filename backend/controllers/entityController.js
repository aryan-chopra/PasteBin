import { nanoid } from 'nanoid'
import {
    ReasonPhrases,
    StatusCodes
} from 'http-status-codes'

import Entity from '../models/entityModel.js'

Entity.createEntity = async (request, response) => {
    try {
        const newEntity = new Entity(
            {
                url: nanoid(10),
                ...request.body
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
                message: "Failed to create entity " + error.name
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
                    message: "Entity not found"
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