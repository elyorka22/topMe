// Временная реализация с localStorage (для миграции на PostgreSQL)
// В продакшене заменить на работу с БД

export const getLocations = async (req, res) => {
  try {
    // В продакшене: SELECT * FROM locations
    res.json({ locations: [], message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params
    // В продакшене: SELECT * FROM locations WHERE id = $1
    res.json({ location: null, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createLocation = async (req, res) => {
  try {
    const locationData = req.body
    // В продакшене: INSERT INTO locations ...
    res.status(201).json({ location: locationData, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params
    const locationData = req.body
    // В продакшене: UPDATE locations SET ... WHERE id = $1
    res.json({ location: locationData, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params
    // В продакшене: DELETE FROM locations WHERE id = $1
    res.json({ message: 'Location deleted', id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
