import React from 'react'
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div key={location.pathname}>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default App