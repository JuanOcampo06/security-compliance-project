// Variable para almacenar la URL del backend en Render
const backendURL = "https://security-compliance-project.onrender.com";

async function iniciarAnalisis() {
    const ip = document.getElementById('ipInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const loader = document.getElementById('loader');

    if (!ip) {
        alert("Por favor, ingresa una dirección IP para analizar.");
        return;
    }

    // Mostrar el cargador y limpiar resultados previos
    loader.classList.remove('d-none');
    resultadoDiv.innerHTML = '';

    try {
        // Llamada real a tu API de Python en Render
        const response = await fetch(`${backendURL}/analizar/${ip}`);
        const data = await response.json();

        if (data.error) {
            resultadoDiv.innerHTML = `
                <div class="alert alert-warning shadow-sm">
                    <strong>Aviso:</strong> ${data.error}
                </div>`;
        } else {
            // Guardamos los datos en el navegador para que el PDF pueda leerlos después
            window.datosUltimoAnalisis = data;
            window.ipUltimoAnalisis = ip;

            // Inyectamos el HTML con los resultados y el botón de PDF
            resultadoDiv.innerHTML = `
                <div class="card bg-white p-4 shadow-sm border-0">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h3 class="text-primary m-0">Resultados del Análisis: ${ip}</h3>
                        <button class="btn btn-outline-danger" onclick="generarPDF()">
                            <i class="bi bi-file-earmark-pdf"></i> Descargar Reporte PDF
                        </button>
                    </div>
                    
                    <p><strong>Organización Detectada:</strong> ${data.organizacion}</p>
                    <p><strong>Puertos Abiertos:</strong> ${data.puertos_abiertos.join(', ') || 'Ninguno detectado'}</p>
                    <hr>
                    
                    <h5 class="text-danger">
                        <i class="bi bi-exclamation-triangle"></i> Hallazgos de Cumplimiento (ISO 27001 / Ley 1581):
                    </h5>
                    <ul class="mt-2">
                        ${data.vulnerabilidades.map(v => `<li class="mb-2">${v}</li>`).join('')}
                    </ul>
                    
                    <div class="mt-3">
                        <small class="text-muted">Nota: Este análisis utiliza activos públicos detectados vía Shodan API.</small>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        resultadoDiv.innerHTML = `
            <div class="alert alert-danger shadow-sm">
                <strong>Error:</strong> No se pudo conectar con el servidor. Verifica que el backend en Render esté activo.
            </div>`;
    } finally {
        // Ocultar el cargador
        loader.classList.add('d-none');
    }
}

// Función para crear y descargar el PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Recuperamos los datos guardados
    const data = window.datosUltimoAnalisis;
    const ip = window.ipUltimoAnalisis;

    if (!data) return alert("No hay datos para generar el reporte.");

    // Configuración del diseño del PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Reporte de Cumplimiento Técnico", 20, 25);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Dirección IP: ${ip}`, 20, 40);
    doc.text(`Organización: ${data.organizacion}`, 20, 48);
    doc.text(`Fecha del análisis: ${new Date().toLocaleString()}`, 20, 56);
    
    doc.setLineWidth(0.5);
    doc.line(20, 62, 190, 62);
    
    // Sección de Puertos
    doc.setFont("helvetica", "bold");
    doc.text("Puertos e Infraestructura Detectada:", 20, 72);
    doc.setFont("helvetica", "normal");
    doc.text(data.puertos_abiertos.join(', ') || 'Sin puertos públicos detectados', 20, 80);

    // Sección de Hallazgos
    doc.setFont("helvetica", "bold");
    doc.text("Evaluación de Seguridad y Normativa:", 20, 95);
    doc.setFont("helvetica", "normal");
    
    let ejeY = 105;
    data.vulnerabilidades.forEach(hallazgo => {
        // Ajuste de texto para que no se salga de la hoja
        const lines = doc.splitTextToSize(`- ${hallazgo}`, 160);
        doc.text(lines, 20, ejeY);
        ejeY += (lines.length * 7);
    });

    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Este reporte es generado automáticamente bajo fines académicos de ciberseguridad.", 20, 280);

    // Descarga automática
    doc.save(`Reporte_Seguridad_${ip}.pdf`);
}
