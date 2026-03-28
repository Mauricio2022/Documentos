import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        <span className="font-bold text-gray-800 text-lg">DocuGen</span>
        <Link to="/" className="text-sm text-gray-600 hover:text-blue-600">Inicio</Link>
        <Link to="/curriculum" className="text-sm text-gray-600 hover:text-blue-600">Currículum</Link>
        <Link to="/renuncia" className="text-sm text-gray-600 hover:text-blue-600">Renuncia</Link>
        <Link to="/vacaciones" className="text-sm text-gray-600 hover:text-blue-600">Vacaciones</Link>
        <Link to="/recomendacion" className="text-sm text-gray-600 hover:text-blue-600">Recomendación</Link>
      </div>
    </nav>
  )
}

export default Navbar