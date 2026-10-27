import React from 'react'
import Header from './Header'
import { UserProvider } from './context/UserProvider'

function App() {
  return (
    <UserProvider>
      <div>
        <Header />
      </div>
    </UserProvider>
  )
}

export default App
