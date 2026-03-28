import { Link } from 'react-router-dom'

const documentos = [
  { titulo: 'Currículum', desc: 'CV profesional listo para descargar', ruta: '/curriculum', color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
  { titulo: 'Carta de renuncia', desc: 'Redacta tu renuncia formalmente', ruta: '/renuncia', color: 'bg-red-50 border-red-200 hover:border-red-400' },
  { titulo: 'Solicitud de vacaciones', desc: 'Pide tus vacaciones por escrito', ruta: '/vacaciones', color: 'bg-green-50 border-green-200 hover:border-green-400' },
  { titulo: 'Carta de recomendación', desc: 'Genera una carta para un colega', ruta: '/recomendacion', color: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
]

function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Generador de documentos</h1>
      <p className="text-gray-500 mb-10">Elige el documento que necesitas crear</p>
      <div className="grid grid-cols-2 gap-6">
        {documentos.map((doc) => (
          <Link key={doc.ruta} to={doc.ruta}
            className={`border-2 rounded-xl p-6 transition-all ${doc.color}`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{doc.titulo}</h2>
            <p className="text-sm text-gray-500">{doc.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home