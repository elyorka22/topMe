export const getStats = async (req, res) => {
  try {
    // В продакшене: агрегация из БД
    res.json({
      totalLocations: 0,
      restaurants: 0,
      shops: 0,
      ads: 0,
      totalUsers: 0,
      adminUsers: 0,
      regularUsers: 0
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAdminLocations = async (req, res) => {
  try {
    res.json({ locations: [], message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAdminUsers = async (req, res) => {
  try {
    res.json({ users: [], message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
