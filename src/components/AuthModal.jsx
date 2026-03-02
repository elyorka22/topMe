import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

function AuthModal({ onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode) // 'login' или 'register'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, register } = useAuth()

  // Форма входа
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Форма регистрации
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = login(loginEmail, loginPassword)
    setLoading(false)

    if (result.success) {
      onClose()
    } else {
      setError(result.error)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!registerName || !registerEmail || !registerPassword || !registerPhone) {
      setError('Barcha maydonlarni to\'ldiring')
      setLoading(false)
      return
    }

    if (registerPassword.length < 6) {
      setError('Parol kamida 6 belgidan iborat bo\'lishi kerak')
      setLoading(false)
      return
    }

    const result = register(registerName, registerEmail, registerPassword, registerPhone)
    setLoading(false)

    if (result.success) {
      onClose()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>×</button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login')
              setError('')
            }}
          >
            Kirish
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register')
              setError('')
            }}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">email</span>
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">lock</span>
                Parol
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Kirilmoqda...' : 'Kirish'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">person</span>
                Имя
              </label>
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="Ваше имя"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">email</span>
                Email
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">phone</span>
                Telefon
              </label>
              <input
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                placeholder="+998 90 123-45-67"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-form-group">
              <label>
                <span className="material-symbols-outlined">lock</span>
                Пароль
              </label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Минимум 6 символов"
                required
                minLength={6}
                disabled={loading}
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
