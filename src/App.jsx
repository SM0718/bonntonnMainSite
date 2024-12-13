import React from 'react'
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
        <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default App