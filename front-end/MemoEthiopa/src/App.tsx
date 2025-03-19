// import { useState } from 'react'

import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import LandingPage from './components/LandingPage'

function App() {
  const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
  useEffect(() => {
    document.title = "Memo Ethiopa"
  })

  return (
    <>
      {loggedIn ?
        (
          <>
          home
          {/* userpage */}
          </>
        )
          :
          (
            <>
            <LandingPage />
            </>
          )
     }
    </>
  )
}

export default App
