from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Permitir que el frontend de Vercel se comunique con este backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Luego lo cambiaremos por tu URL de Vercel por seguridad
    allow_methods=["*"],
    allow_headers=["*"],
)

SHODAN_API_KEY = "TU_API_KEY_AQUI" # Solo para probar, luego la ocultaremos

@app.get("/analizar/{ip}")
def analizar_ip(ip: str):
    try:
        # 1. Consultar a Shodan
        url = f"https://api.shodan.io/shodan/host/{ip}?key={SHODAN_API_KEY}"
        response = requests.get(url)
        data = response.json()

        # 2. Lógica de cumplimiento (El "Wow")
        puertos = data.get('ports', [])
        riesgos = []
        
        if 21 in puertos:
            riesgos.append("Uso de FTP detectado. Incumple principio de seguridad de Ley 1581 (Datos en texto plano).")
        if 80 in puertos:
            riesgos.append("Puerto 80 (HTTP) abierto. Se recomienda migrar a HTTPS para proteger la privacidad.")
            
        return {
            "ip": ip,
            "organizacion": data.get('org', 'Desconocida'),
            "puertos_abiertos": puertos,
            "vulnerabilidades": riesgos if riesgos else ["No se detectaron riesgos críticos inmediatos."]
        }
    except Exception as e:
        return {"error": "No se pudo obtener información de esta IP o no es pública."}
