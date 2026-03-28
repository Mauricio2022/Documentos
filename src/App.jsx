import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Curriculum from './pages/Curriculum'
import CartaRenuncia from './pages/CartaRenuncia'
import Vacaciones from './pages/Vacaciones'
import Recomendacion from './pages/Recomendacion'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/renuncia" element={<CartaRenuncia />} />
        <Route path="/vacaciones" element={<Vacaciones />} />
        <Route path="/recomendacion" element={<Recomendacion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App