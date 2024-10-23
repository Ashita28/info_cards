import './App.css'
import { Read, Update, CreatePost, Navbar } from "./components/index"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<CreatePost />} />
        <Route path='/read' element={<Read />} />
        <Route path='/:id' element={<Update />} /> {/* Keep this as is */}
      </Routes>
    </Router>
  )
}

export default App
