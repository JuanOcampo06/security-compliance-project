function iniciarAnalisis() {
    const ip = document.getElementById('ipInput').value;
    if (!ip) return alert("Por favor ingresa una IP");

    document.getElementById('loader').classList.remove('d-none');
    document.getElementById('resultado').innerHTML = '';

    // Simulamos una demora de red de 2 segundos
    setTimeout(() => {
        document.getElementById('loader').classList.add('d-none');
        document.getElementById('resultado').innerHTML = `
            <div class="alert alert-warning">
                <h4>Resultados para: ${ip}</h4>
                <hr>
                <p><strong>Estado:</strong> Riesgo Moderado</p>
                <p><strong>Hallazgo:</strong> Se detectó el puerto 21 (FTP) abierto. Esto incumple los principios de seguridad de la <strong>Ley 1581</strong> al no garantizar la integridad de los datos en tránsito.</p>
                <button class="btn btn-outline-dark btn-sm">Descargar Reporte PDF</button>
            </div>
        `;
    }, 2000);
}
