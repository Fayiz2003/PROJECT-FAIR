import { Route, Routes,Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Footer from "./components/Footer";
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/Authcontext'

function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth insideRegister={true} />} />
      <Route path='/projects' element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>} />
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App