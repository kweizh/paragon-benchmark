import { useState, useEffect } from 'react'
import { paragon } from '@useparagon/connect'
import './App.css'

function App() {
  const [userState, setUserState] = useState(null)
  const projectId = import.meta.env.VITE_PARAGON_PROJECT_ID
  const userToken = import.meta.env.VITE_PARAGON_TOKEN

  useEffect(() => {
    const initParagon = async () => {
      try {
        if (!projectId || !userToken) {
          console.error('VITE_PARAGON_PROJECT_ID or VITE_PARAGON_TOKEN is missing')
          return
        }
        await paragon.authenticate(projectId, userToken)
        const user = paragon.getUser()
        setUserState({
          authenticated: user.authenticated,
          integrations: user.integrations
        })
      } catch (error) {
        console.error('Paragon authentication failed:', error)
      }
    }

    initParagon()
  }, [projectId, userToken])

  return (
    <div className="App">
      <h1>Paragon User State</h1>
      <div id="paragon-user-state">
        {userState ? JSON.stringify(userState) : 'Loading...'}
      </div>
    </div>
  )
}

export default App
