import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Esto permite que la página de Vercel pueda hacer consultas aquí
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aquí le decimos que busque la llave que puse en Render
SHODAN_API_KEY = os.getenv("SHODAN_API_KEY")

@app.get("/")
def inicio():
    return {"mensaje": "Servidor de Seguridad Activo"}

@app.get("/analizar/{ip}")
def analizar_ip(ip: str):
    if not SHODAN_API_KEY:
        return {"error": "Configuración de API incompleta"}
    
    try:
        url = f"https://api.shodan.io/shodan/host/{ip}?key={SHODAN_API_KEY}"
        response = requests.get(url)
        data = response.json()
        
        puertos = data.get('ports', [])
        hallazgos = []
        
        # Lógica de cumplimiento
        if 21 in puertos:
            hallazgos.append("Puerto 21 (FTP): Riesgo alto de interceptación. Incumple Ley 1581.")
        if 23 in puertos:
            hallazgos.append("Puerto 23 (Telnet): Protocolo inseguro detectado.")
        
        return {
            "organizacion": data.get('org', 'No disponible'),
            "puertos_abiertos": puertos,
            "vulnerabilidades": hallazgos if hallazgos else ["Sin vulnerabilidades críticas evidentes."]
        }
    except:
        return {"error": "IP no encontrada o límite de API alcanzado"}
