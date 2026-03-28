import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const HABILIDADES_OPCIONES = [
  'Microsoft Office', 'Excel avanzado', 'Word', 'PowerPoint',
  'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'HTML/CSS',
  'Photoshop', 'Illustrator', 'Figma',
  'Liderazgo', 'Trabajo en equipo', 'Comunicación efectiva', 'Resolución de problemas',
  'Gestión de proyectos', 'Atención al cliente', 'Ventas', 'Contabilidad',
  'Redes sociales', 'Marketing digital', 'SEO', 'Google Ads',
  'Inglés técnico', 'Redacción', 'Negociación', 'Gestión del tiempo',
]

const IDIOMAS_OPCIONES = [
  'Español nativo', 'Español fluido',
  'Inglés básico (A1)', 'Inglés elemental (A2)', 'Inglés intermedio (B1)',
  'Inglés intermedio alto (B2)', 'Inglés avanzado (C1)', 'Inglés fluido (C2)',
  'Francés básico', 'Francés intermedio', 'Francés avanzado',
  'Portugués básico', 'Portugués intermedio', 'Portugués avanzado',
  'Alemán básico', 'Alemán intermedio', 'Italiano básico', 'Mandarín básico',
]

function TagSelector({ opciones, seleccionados, onToggle, placeholder }) {
  const [busqueda, setBusqueda] = useState('')
  const filtradas = opciones.filter(o =>
    o.toLowerCase().includes(busqueda.toLowerCase()) && !seleccionados.includes(o)
  )

  return (
    <div>
      <input
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{
          width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '10px',
          padding: '9px 14px', fontSize: '13px', outline: 'none',
          background: '#f8fafc', color: '#1e293b', boxSizing: 'border-box',
          transition: 'border 0.2s',
        }}
        onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
        onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
        placeholder={placeholder} />

      {busqueda && filtradas.length > 0 && (
        <div style={{
          border: '1.5px solid #e2e8f0', borderRadius: '10px', background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginTop: '6px',
          maxHeight: '160px', overflowY: 'auto', zIndex: 10, position: 'relative',
        }}>
          {filtradas.map(op => (
            <div key={op} onClick={() => { onToggle(op); setBusqueda('') }}
              style={{
                padding: '9px 14px', fontSize: '13px', color: '#475569',
                cursor: 'pointer', transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.target.style.background = '#f1f5f9'}
              onMouseLeave={e => e.target.style.background = 'transparent'}>
              + {op}
            </div>
          ))}
        </div>
      )}

      {seleccionados.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {seleccionados.map(s => (
            <span key={s} onClick={() => onToggle(s)}
              style={{
                background: '#eef2ff', color: '#4f46e5', border: '1.5px solid #c7d2fe',
                fontSize: '12px', padding: '4px 10px', borderRadius: '20px',
                cursor: 'pointer', transition: 'all 0.15s', userSelect: 'none',
              }}
              onMouseEnter={e => { e.target.style.background = '#fee2e2'; e.target.style.color = '#dc2626'; e.target.style.borderColor = '#fca5a5' }}
              onMouseLeave={e => { e.target.style.background = '#eef2ff'; e.target.style.color = '#4f46e5'; e.target.style.borderColor = '#c7d2fe' }}>
              {s} ✕
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function Campo({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '9px 14px',
  fontSize: '13px', outline: 'none', background: '#f8fafc', color: '#1e293b',
  width: '100%', boxSizing: 'border-box', transition: 'border 0.2s',
}

const textareaStyle = {
  ...inputStyle, resize: 'none', lineHeight: '1.6', fontFamily: 'inherit',
}

function Curriculum() {
  const [datos, setDatos] = useState({
    nombre: '', cargo: '', email: '', telefono: '',
    ciudad: '', linkedin: '', perfil: '', experiencia: '', educacion: '',
  })
  const [habilidades, setHabilidades] = useState([])
  const [idiomas, setIdiomas] = useState([])
  const [generando, setGenerando] = useState(false)
  const previewRef = useRef()

  const actualizar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })
  const toggleHabilidad = (h) => setHabilidades(prev => prev.includes(h) ? prev.filter(x => x !== h) : [...prev, h])
  const toggleIdioma = (i) => setIdiomas(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])

  const generarPDF = async () => {
    setGenerando(true)
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true })
    const imagen = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const ancho = pdf.internal.pageSize.getWidth()
    const alto = (canvas.height * ancho) / canvas.width
    pdf.addImage(imagen, 'PNG', 0, 0, ancho, alto)
    pdf.save(`CV-${datos.nombre || 'documento'}.pdf`)
    setGenerando(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#818cf8' }} />
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.3px' }}>
              Currículum profesional
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#a5b4fc', paddingLeft: '18px' }}>
            Formato optimizado para ATS e inteligencia artificial
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => { setDatos({ nombre: '', cargo: '', email: '', telefono: '', ciudad: '', linkedin: '', perfil: '', experiencia: '', educacion: '' }); setHabilidades([]); setIdiomas([]) }}
            style={{
              background: 'transparent', color: '#a5b4fc',
              border: '1.5px solid #4f46e5', borderRadius: '12px', padding: '11px 22px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4f46e5'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a5b4fc' }}>
            Limpiar
          </button>
          <button onClick={generarPDF} disabled={generando}
            style={{
              background: generando ? '#6366f1aa' : '#6366f1', color: '#fff',
              border: 'none', borderRadius: '12px', padding: '11px 22px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)', transition: 'all 0.2s',
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {generando ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
        
      </div>
      

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 32px', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '28px' }}>

        {/* FORMULARIO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Tarjeta */}
          {[
            {
              titulo: 'Información personal',
              contenido: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <Campo label="Nombre completo">
                    <input name="nombre" value={datos.nombre} onChange={actualizar} style={inputStyle}
                      onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                      onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                      placeholder="Mauricio García" />
                  </Campo>
                  <Campo label="Cargo o título profesional">
                    <input name="cargo" value={datos.cargo} onChange={actualizar} style={inputStyle}
                      onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                      onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                      placeholder="Desarrollador Web Full Stack" />
                  </Campo>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Campo label="Email">
                      <input name="email" value={datos.email} onChange={actualizar} style={inputStyle}
                        onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                        onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                        placeholder="correo@email.com" />
                    </Campo>
                    <Campo label="Teléfono">
                      <input name="telefono" value={datos.telefono} onChange={actualizar} style={inputStyle}
                        onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                        onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                        placeholder="+503 0000-0000" />
                    </Campo>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <Campo label="Ciudad">
                      <input name="ciudad" value={datos.ciudad} onChange={actualizar} style={inputStyle}
                        onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                        onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                        placeholder="San Salvador, SV" />
                    </Campo>
                    <Campo label="LinkedIn">
                      <input name="linkedin" value={datos.linkedin} onChange={actualizar} style={inputStyle}
                        onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                        onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                        placeholder="linkedin.com/in/usuario" />
                    </Campo>
                  </div>
                </div>
              )
            },
            {
              titulo: 'Perfil profesional',
              contenido: (
                <textarea name="perfil" value={datos.perfil} onChange={actualizar} rows={4} style={textareaStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Describe tu experiencia, especialidad y lo que aportas. Usa palabras clave de tu industria." />
              )
            },
            {
              titulo: 'Experiencia laboral',
              tip: 'Tip ATS: usa viñetas (•) y menciona resultados con números',
              contenido: (
                <textarea name="experiencia" value={datos.experiencia} onChange={actualizar} rows={6} style={textareaStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder={'Empresa | Cargo | 2022 - Presente\n• Responsabilidad o logro principal\n• Logro con impacto medible\n\nEmpresa anterior | Cargo | 2019 - 2022\n• Responsabilidad o logro'} />
              )
            },
            {
              titulo: 'Educación',
              contenido: (
                <textarea name="educacion" value={datos.educacion} onChange={actualizar} rows={3} style={textareaStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder={'Universidad de El Salvador | Ing. en Sistemas | 2018\nCertificación en React | Udemy | 2022'} />
              )
            },
            {
              titulo: 'Habilidades',
              contenido: <TagSelector opciones={HABILIDADES_OPCIONES} seleccionados={habilidades} onToggle={toggleHabilidad} placeholder="Buscar habilidad..." />
            },
            {
              titulo: 'Idiomas',
              contenido: <TagSelector opciones={IDIOMAS_OPCIONES} seleccionados={idiomas} onToggle={toggleIdioma} placeholder="Buscar idioma..." />
            },
          ].map(({ titulo, contenido, tip }) => (
            <div key={titulo} style={{
              background: '#fff', borderRadius: '16px', padding: '20px 22px',
              border: '1.5px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '3px', height: '16px', background: '#6366f1', borderRadius: '2px' }} />
                <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  {titulo}
                </h3>
              </div>
              {contenido}
              {tip && <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#94a3b8' }}>{tip}</p>}
            </div>
          ))}
        </div>

        {/* PREVIEW */}
        <div style={{ position: 'sticky', top: '24px', alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>
              Vista previa — formato A4
            </span>
            <span style={{
              fontSize: '11px', background: '#f0fdf4', color: '#16a34a',
              border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '20px', fontWeight: '600',
            }}>✓ Optimizado para ATS</span>
          </div>

          <div ref={previewRef} style={{
            background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            borderRadius: '4px', fontFamily: 'Arial, sans-serif', color: '#111', overflow: 'hidden',
          }}>
            <div style={{ padding: '40px 48px 20px', borderBottom: '2px solid #111' }}>
              <h1 style={{ fontSize: '22pt', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
                {datos.nombre || 'Tu nombre completo'}
              </h1>
              <p style={{ fontSize: '11pt', color: '#444', margin: '0 0 12px' }}>
                {datos.cargo || 'Cargo o título profesional'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
                {datos.email && <span style={{ fontSize: '9pt', color: '#333' }}>{datos.email}</span>}
                {datos.telefono && <span style={{ fontSize: '9pt', color: '#333' }}>{datos.telefono}</span>}
                {datos.ciudad && <span style={{ fontSize: '9pt', color: '#333' }}>{datos.ciudad}</span>}
                {datos.linkedin && <span style={{ fontSize: '9pt', color: '#333' }}>{datos.linkedin}</span>}
              </div>
            </div>

            <div style={{ padding: '0 48px 40px' }}>
              {datos.perfil && (
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 8px' }}>Perfil profesional</h2>
                  <p style={{ fontSize: '9.5pt', lineHeight: '1.65', color: '#222', margin: 0, wordBreak: 'break-word' }}>{datos.perfil}</p>
                </div>
              )}
              {datos.experiencia && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '16px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px' }}>Experiencia laboral</h2>
                  <p style={{ fontSize: '9.5pt', lineHeight: '1.8', color: '#222', whiteSpace: 'pre-line', margin: 0, wordBreak: 'break-word' }}>{datos.experiencia}</p>
                </div>
              )}
              {datos.educacion && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '16px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px' }}>Educación</h2>
                  <p style={{ fontSize: '9.5pt', lineHeight: '1.8', color: '#222', whiteSpace: 'pre-line', margin: 0, wordBreak: 'break-word' }}>{datos.educacion}</p>
                </div>
              )}
              {habilidades.length > 0 && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '16px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px' }}>Habilidades</h2>
                  <p style={{ fontSize: '9.5pt', lineHeight: '1.8', color: '#222', margin: 0 }}>{habilidades.join(' · ')}</p>
                </div>
              )}
              {idiomas.length > 0 && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '16px' }}>
                  <h2 style={{ fontSize: '9pt', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px' }}>Idiomas</h2>
                  <p style={{ fontSize: '9.5pt', lineHeight: '1.8', color: '#222', margin: 0 }}>{idiomas.join(' · ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Curriculum