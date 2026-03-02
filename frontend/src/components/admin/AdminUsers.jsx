import { useState, useEffect } from 'react'
import './AdminUsers.css'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const saved = localStorage.getItem('users')
    if (saved) {
      try {
        setUsers(JSON.parse(saved))
      } catch {
        setUsers([])
      }
    }
  }

  const saveUsers = (newUsers) => {
    localStorage.setItem('users', JSON.stringify(newUsers))
    setUsers(newUsers)
  }

  const handleToggleAdmin = (userId) => {
    const updated = users.map(user =>
      user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
    )
    saveUsers(updated)
    
    // Обновляем текущего пользователя, если это он
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    if (currentUser.id === userId) {
      currentUser.isAdmin = !currentUser.isAdmin
      localStorage.setItem('user', JSON.stringify(currentUser))
      window.location.reload()
    }
  }

  const handleDelete = (userId) => {
    if (confirm('Bu foydalanuvchini o\'chirishni xohlaysizmi?')) {
      const updated = users.filter(user => user.id !== userId)
      saveUsers(updated)
      
      // Если удаляем текущего пользователя, выходим
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      if (currentUser.id === userId) {
        localStorage.removeItem('user')
        window.location.reload()
      }
    }
  }

  const filteredUsers = filter === 'all'
    ? users
    : filter === 'admin'
    ? users.filter(u => u.isAdmin)
    : users.filter(u => !u.isAdmin)

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <h2>Foydalanuvchilarni boshqarish</h2>
        <div className="user-stats">
          <span>Jami: {users.length}</span>
          <span>Adminlar: {users.filter(u => u.isAdmin).length}</span>
          <span>Oddiy: {users.filter(u => !u.isAdmin).length}</span>
        </div>
      </div>

      <div className="user-filter">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Hammasi
        </button>
        <button
          className={`filter-btn ${filter === 'admin' ? 'active' : ''}`}
          onClick={() => setFilter('admin')}
        >
          Adminlar
        </button>
        <button
          className={`filter-btn ${filter === 'regular' ? 'active' : ''}`}
          onClick={() => setFilter('regular')}
        >
          Oddiy foydalanuvchilar
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ism</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Roli</th>
              <th>Ro'yxatdan o'tgan</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    {user.isAdmin ? (
                      <span className="role-badge admin">Admin</span>
                    ) : (
                      <span className="role-badge user">Foydalanuvchi</span>
                    )}
                  </td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('uz-UZ')
                      : '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className={`toggle-admin-btn ${user.isAdmin ? 'remove' : 'add'}`}
                        onClick={() => handleToggleAdmin(user.id)}
                        title={user.isAdmin ? 'Admin huquqini olib tashlash' : 'Admin qilish'}
                      >
                        <span className="material-symbols-outlined">
                          {user.isAdmin ? 'admin_panel_settings' : 'person'}
                        </span>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(user.id)}
                        title="O'chirish"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">Foydalanuvchilar topilmadi</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers
