import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем, есть ли сохраненный пользователь
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        // Проверяем, является ли пользователь админом
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const fullUserData = users.find(u => u.id === userData.id)
        if (fullUserData && fullUserData.isAdmin) {
          userData.isAdmin = true
        }
        setUser(userData)
      } catch (e) {
        console.error('Ошибка загрузки пользователя:', e)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Получаем всех пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = { ...foundUser }
      delete userData.password // Не сохраняем пароль в состоянии
      if (userData.isAdmin) {
        userData.isAdmin = true
      }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      return { success: true }
    }
    
    return { success: false, error: 'Noto\'g\'ri email yoki parol' }
  }

  const register = (name, email, password, phone) => {
    // Проверяем, существует ли пользователь
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find(u => u.email === email)
    
    if (existingUser) {
      return { success: false, error: 'Bu email bilan foydalanuvchi allaqachon mavjud' }
    }
    
    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      isAdmin: false, // По умолчанию не админ
      createdAt: new Date().toISOString()
    }
    
    // Сохраняем пользователя с паролем
    users.push({ ...newUser, password })
    localStorage.setItem('users', JSON.stringify(users))
    
    // Автоматически входим
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin === true
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
