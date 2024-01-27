import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { MdLogout } from 'react-icons/md'
import useLanguage from '../hooks/useLanguage'

export default function LogoutButton() {
  const { auth } = useContext(AuthContext)
  const text = useLanguage()

  const handleLogout = () => {
    if (confirm(text.confirm)) {
      localStorage.removeItem('accessToken')
      window.location = '/'
    }
  }

  return (
    <>
    {
      auth ? (
        <button
          type="button"
          title="Logout"
          className="button-logout"
          onClick={handleLogout}
        >
          <MdLogout />
        </button>
      ) : ''
    }
    </>
  )
}
