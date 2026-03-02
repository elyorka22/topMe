export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    // В продакшене: проверка в БД
    res.json({ success: false, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    // В продакшене: INSERT INTO users ...
    res.json({ success: false, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    res.json({ user: null, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
