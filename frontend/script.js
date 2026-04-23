async function iniciarAnalisis() {
    const ip = document.getElementById('ipInput').value;
    const resultadoDiv = document.getElementById('resultado');
    const loader = document.getElementById('loader');

    if (!ip) {
        alert("Por favor, ingresa una dirección IP para analizar.");
        return;
    }

    // Tu link de Render ya configurado
    const backendURL = "https://security-compliance-project.onrender.com"; 

    // Mostrar el cargador y limpiar resultados previos
    loader.classList.remove('d-none');
    resultadoDiv.innerHTML = '';

    try {
        // Llamada real a tu API de Python
        const response = await fetch(`${backendURL}/analizar/${ip}`);
        const data = await response.json();

        if (data.error) {
            resultadoDiv.innerHTML = `
                <div class="alert alert-warning shadow-sm">
                    <strong>Aviso:</strong> ${data.error}
                </div>`;
        } else {
            // Mostrar los datos reales de Shodan y el cumplimiento legal
            resultadoDiv.innerHTML = `
                <div class="card bg-white p-4 shadow-sm border-0">
                    <h3 class="text-primary mb-3">Resultados del Análisis: ${ip}</h3>
                    <p><strong>Organización Detectada:</strong> ${data.organizacion}</p>
                    <p><strong>Puertos Abiertos:</strong> ${data.puertos_abiertos.join(', ') || 'Ninguno detectado'}</p>
                    <hr>
                    <h5 class="text-danger"><i class="bi bi-exclamation-triangle"></i> Hallazgos de Cumplimiento (ISO 27001 / Ley 1581):</h5>
                    <ul class="mt-2">
                        ${data.vulnerabilidades.map(v => `<li class="mb-2">${v}</li>`).join('')}
                    </ul>
                    <div class="mt-3">
                        <small class="text-muted">Nota: Este análisis se basa en activos públicos expuestos en internet.</small>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        resultadoDiv.innerHTML = `
            <div class="alert alert-danger shadow-sm">
                <strong>Error:</strong> No se pudo establecer conexión con el servidor de análisis. Asegúrate de que el backend en Render esté activo.
            </div>`;
    } finally {
        // Ocultar el cargador al terminar
        loader.classList.add('d-none');
    }
}
