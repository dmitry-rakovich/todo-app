import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ProjectPage from './pages/ProjectPage/ProjectPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/project/:id' element={<ProjectPage/>}/>
      </Routes>
    </>
  )
}

export default App
