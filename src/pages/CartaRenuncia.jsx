import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const inputStyle = {
  border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '9px 14px',
  fontSize: '13px', outline: 'none', background: '#f8fafc', color: '#1e293b',
  width: '100%', boxSizing: 'border-box', transition: 'border 0.2s',
}

const textareaStyle = {
  ...inputStyle, resize: 'none', lineHeight: '1.6', fontFamily: 'inherit',
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

function Tarjeta({ titulo, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', padding: '20px 22px',
      border: '1.5px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{ width: '3px', height: '16px', background: '#6366f1', borderRadius: '2px' }} />
        <h3 style={{ margin: 0, fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          {titulo}
        </h3>
      </div>
      {children}
    </div>
  )
}

function CartaRenuncia() {
  const [datos, setDatos] = useState({
    nombreEmpleado: '',
    cargoEmpleado: '',
    nombreEmpresa: '',
    nombreJefe: '',
    cargoJefe: '',
    fechaRenuncia: '',
    ultimoDia: '',
    motivo: '',
    ciudad: '',
    fecha: new Date().toLocaleDateString('es-SV', { year: 'numeric', month: 'long', day: 'numeric' }),
  })
  const [generando, setGenerando] = useState(false)
  const previewRef = useRef()

  const actualizar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const limpiar = () => setDatos({
    nombreEmpleado: '', cargoEmpleado: '', nombreEmpresa: '',
    nombreJefe: '', cargoJefe: '', fechaRenuncia: '', ultimoDia: '',
    motivo: '', ciudad: '',
    fecha: new Date().toLocaleDateString('es-SV', { year: 'numeric', month: 'long', day: 'numeric' }),
  })

  const generarPDF = async () => {
    setGenerando(true)
    const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true })
    const imagen = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const ancho = pdf.internal.pageSize.getWidth()
    const alto = (canvas.height * ancho) / canvas.width
    pdf.addImage(imagen, 'PNG', 0, 0, ancho, alto)
    pdf.save(`Renuncia-${datos.nombreEmpleado || 'documento'}.pdf`)
    setGenerando(false)
  }

  const motivos = {
    crecimiento: 'He tomado la decisión de renunciar a mi cargo con el fin de buscar nuevas oportunidades de crecimiento profesional que se alineen mejor con mis objetivos a largo plazo.',
    personal: 'Por motivos de índole personal, me veo en la necesidad de presentar mi renuncia al cargo que vengo desempeñando.',
    estudios: 'He decidido dedicarme a continuar con mi formación académica, por lo que me veo en la necesidad de renunciar al cargo que actualmente desempeño.',
    reubicacion: 'Debido a una reubicación geográfica, me veo en la imposibilidad de continuar desempeñando mis funciones, por lo que presento mi renuncia.',
    nuevo_empleo: 'He recibido una oferta laboral que representa un paso importante en mi desarrollo profesional, por lo que he tomado la decisión de renunciar a mi cargo actual.',
    otro: datos.motivo,
  }

  const [motivoTipo, setMotivoTipo] = useState('crecimiento')

  const motivoTexto = motivoTipo === 'otro' ? datos.motivo : motivos[motivoTipo]

  const carta = `${datos.ciudad || '[Ciudad]'}, ${datos.fecha}


${datos.nombreJefe || '[Nombre del jefe]'}
${datos.cargoJefe || '[Cargo del jefe]'}
${datos.nombreEmpresa || '[Nombre de la empresa]'}
Presente


Estimado/a ${datos.nombreJefe ? `${datos.nombreJefe.split(' ')[0]}` : '[Nombre]'}:

Por medio de la presente, yo ${datos.nombreEmpleado || '[Tu nombre]'}, con el cargo de ${datos.cargoEmpleado || '[Tu cargo]'}, me dirijo a usted de manera respetuosa para hacer formal mi renuncia al puesto que vengo desempeñando en ${datos.nombreEmpresa || '[Empresa]'}.

${motivoTexto || '[Motivo de renuncia]'}

Mi último día de labores será el ${datos.ultimoDia || '[fecha de último día]'}, lo que me permitirá cumplir con el periodo de aviso establecido y apoyar en el proceso de transición que sea necesario.

Quiero expresar mi más sincero agradecimiento a la empresa y a usted personalmente por la oportunidad de crecimiento y aprendizaje que me brindaron durante mi tiempo en ${datos.nombreEmpresa || '[Empresa]'}. Ha sido una experiencia enriquecedora tanto a nivel profesional como personal.

Quedo a disposición para colaborar en lo que sea necesario durante este período de transición.


Atentamente,


${datos.nombreEmpleado || '[Tu nombre]'}
${datos.cargoEmpleado || '[Tu cargo]'}
${datos.ciudad || '[Ciudad]'}`

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
              Carta de renuncia
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#a5b4fc', paddingLeft: '18px' }}>
            Redacta tu renuncia de forma profesional y formal
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={limpiar}
            style={{
              background: 'transparent', color: '#a5b4fc',
              border: '1.5px solid #4f46e5', borderRadius: '12px', padding: '11px 22px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
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
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {generando ? 'Generando...' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '28px' }}>

        {/* FORMULARIO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <Tarjeta titulo="Tus datos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Campo label="Tu nombre completo">
                <input name="nombreEmpleado" value={datos.nombreEmpleado} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Mauricio García" />
              </Campo>
              <Campo label="Tu cargo actual">
                <input name="cargoEmpleado" value={datos.cargoEmpleado} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Analista de sistemas" />
              </Campo>
              <Campo label="Ciudad">
                <input name="ciudad" value={datos.ciudad} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="San Salvador" />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta titulo="Datos de la empresa">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Campo label="Nombre de la empresa">
                <input name="nombreEmpresa" value={datos.nombreEmpresa} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Empresa S.A. de C.V." />
              </Campo>
              <Campo label="Nombre de tu jefe o supervisor">
                <input name="nombreJefe" value={datos.nombreJefe} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Lic. Roberto Méndez" />
              </Campo>
              <Campo label="Cargo del jefe">
                <input name="cargoJefe" value={datos.cargoJefe} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Gerente de Recursos Humanos" />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta titulo="Fechas">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Campo label="Último día de trabajo">
                <input name="ultimoDia" value={datos.ultimoDia} onChange={actualizar} style={inputStyle}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="31 de enero de 2025" />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta titulo="Motivo de renuncia">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { key: 'crecimiento', label: 'Crecimiento profesional' },
                { key: 'nuevo_empleo', label: 'Nueva oportunidad laboral' },
                { key: 'estudios', label: 'Continuar estudios' },
                { key: 'reubicacion', label: 'Reubicación geográfica' },
                { key: 'personal', label: 'Motivos personales' },
                { key: 'otro', label: 'Otro (escribir)' },
              ].map(op => (
                <label key={op.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="motivoTipo" value={op.key}
                    checked={motivoTipo === op.key}
                    onChange={() => setMotivoTipo(op.key)}
                    style={{ accentColor: '#6366f1', width: '15px', height: '15px' }} />
                  <span style={{ fontSize: '13px', color: '#475569' }}>{op.label}</span>
                </label>
              ))}
              {motivoTipo === 'otro' && (
                <textarea name="motivo" value={datos.motivo} onChange={actualizar} rows={3} style={{ ...textareaStyle, marginTop: '6px' }}
                  onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
                  onBlur={e => e.target.style.border = '1.5px solid #e2e8f0'}
                  placeholder="Describe tu motivo de renuncia..." />
              )}
            </div>
          </Tarjeta>

        </div>

        {/* PREVIEW CARTA */}
        <div style={{ position: 'sticky', top: '24px', alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '600' }}>
              Vista previa — formato A4
            </span>
            <span style={{
              fontSize: '11px', background: '#f0fdf4', color: '#16a34a',
              border: '1px solid #bbf7d0', padding: '4px 10px', borderRadius: '20px', fontWeight: '600',
            }}>✓ Tono formal y profesional</span>
          </div>

          <div ref={previewRef} style={{
            background: '#fff', boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            borderRadius: '4px', fontFamily: 'Arial, sans-serif', color: '#111',
            padding: '56px 64px', minHeight: '400px',
          }}>
            <p style={{ fontSize: '10pt', color: '#333', margin: '0 0 32px', textAlign: 'right' }}>
              {datos.ciudad || '[Ciudad]'}, {datos.fecha}
            </p>

            <p style={{ fontSize: '10pt', color: '#111', margin: '0', fontWeight: '700' }}>
              {datos.nombreJefe || '[Nombre del jefe]'}
            </p>
            <p style={{ fontSize: '10pt', color: '#333', margin: '2px 0' }}>
              {datos.cargoJefe || '[Cargo del jefe]'}
            </p>
            <p style={{ fontSize: '10pt', color: '#333', margin: '2px 0 24px' }}>
              {datos.nombreEmpresa || '[Nombre de la empresa]'}
            </p>

            <p style={{ fontSize: '10pt', color: '#111', margin: '0 0 20px' }}>
              Estimado/a {datos.nombreJefe ? datos.nombreJefe.split(' ')[0] : '[Nombre]'}:
            </p>

            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#222', margin: '0 0 16px', textAlign: 'justify' }}>
              Por medio de la presente, yo <strong>{datos.nombreEmpleado || '[Tu nombre]'}</strong>, con el cargo de <strong>{datos.cargoEmpleado || '[Tu cargo]'}</strong>, me dirijo a usted de manera respetuosa para hacer formal mi renuncia al puesto que vengo desempeñando en <strong>{datos.nombreEmpresa || '[Empresa]'}</strong>.
            </p>

            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#222', margin: '0 0 16px', textAlign: 'justify' }}>
              {motivoTexto || '[Motivo de renuncia]'}
            </p>

            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#222', margin: '0 0 16px', textAlign: 'justify' }}>
              Mi último día de labores será el <strong>{datos.ultimoDia || '[fecha de último día]'}</strong>, lo que me permitirá cumplir con el periodo de aviso establecido y apoyar en el proceso de transición que sea necesario.
            </p>

            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#222', margin: '0 0 16px', textAlign: 'justify' }}>
              Quiero expresar mi más sincero agradecimiento a la empresa y a usted personalmente por la oportunidad de crecimiento y aprendizaje que me brindaron durante mi tiempo en <strong>{datos.nombreEmpresa || '[Empresa]'}</strong>. Ha sido una experiencia enriquecedora tanto a nivel profesional como personal.
            </p>

            <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#222', margin: '0 0 48px', textAlign: 'justify' }}>
              Quedo a disposición para colaborar en lo que sea necesario durante este período de transición.
            </p>

            <p style={{ fontSize: '10pt', color: '#333', margin: '0 0 48px' }}>Atentamente,</p>

            <div style={{ borderTop: '1px solid #333', width: '200px', marginBottom: '8px' }} />
            <p style={{ fontSize: '10pt', fontWeight: '700', color: '#111', margin: '0' }}>
              {datos.nombreEmpleado || '[Tu nombre]'}
            </p>
            <p style={{ fontSize: '10pt', color: '#444', margin: '2px 0' }}>
              {datos.cargoEmpleado || '[Tu cargo]'}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartaRenuncia