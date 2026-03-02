export const getUsers = async (req, res) => {
  try {
    res.json({ users: [], message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    res.json({ user: null, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const userData = req.body
    res.json({ user: userData, message: 'Use database in production' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    res.json({ message: 'User deleted', id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
