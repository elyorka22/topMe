import express from 'express'
import { getLocations, getLocationById, createLocation, updateLocation, deleteLocation } from '../controllers/locations.js'

export const locationsRouter = express.Router()

locationsRouter.get('/', getLocations)
locationsRouter.get('/:id', getLocationById)
locationsRouter.post('/', createLocation)
locationsRouter.put('/:id', updateLocation)
locationsRouter.delete('/:id', deleteLocation)
