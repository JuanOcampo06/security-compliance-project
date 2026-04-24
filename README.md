# security-compliance-project
CyberGuard: Automated Compliance & Risk Analyzer
📋 Project Overview
CyberGuard is a Full-Stack solution designed to automate the reconnaissance phase of digital assets and conduct preliminary regulatory compliance assessments. The tool enables organizations to identify exposed attack surfaces and correlate technical findings with the Colombian legal framework (Law 1581 of 2012) and the international standard ISO 27001.

🚀 System Architecture
The project implements a distributed architecture to ensure scalability and separation of concerns:

Frontend (Vercel): A reactive User Interface built with HTML5, CSS3 (Bootstrap 5), and asynchronous JavaScript.

Backend (Render): A robust REST API developed in Python using the FastAPI framework.

Data Integration: Real-time consumption of the Shodan API for Open Source Intelligence (OSINT) gathering.

Reporting Engine: Dynamic generation of technical PDF reports using the jsPDF library.

🛠️ Tech Stack
Languages: Python 3.x, JavaScript (ES6+).

Frameworks/Libraries: FastAPI, Uvicorn, Requests (Backend); Bootstrap 5, jsPDF (Frontend).

Infrastructure: Vercel (Static Hosting), Render (Web Services), GitHub (CI/CD).

Security: Credential management via Environment Variables to protect third-party API access.

⚖️ Compliance-Driven Approach
Unlike traditional vulnerability scanners, CyberGuard translates technical findings into actionable compliance risks:

Personal Data Protection: Detects if insecure protocols (such as FTP or Telnet) expose personal data under Law 1581, suggesting encryption remediation.

ISO 27001 Alignment: Identifies unnecessary open ports that contravene network security controls and technical vulnerability management guidelines.

🔧 Local Installation & Deployment
Clone the repository:

Bash
git clone https://github.com/JuanOcampo06/security-compliance-project.git
Backend Setup:

Bash
cd backend
pip install -r requirements.txt
export SHODAN_API_KEY="your_api_key_here"
uvicorn main:app --reload
Frontend Execution:
Simply open frontend/index.html in your browser or deploy to Vercel pointing to the corresponding root directory.

🎓 Credits
Developed by Juan Esteban Ocampo Restrepo, Engineering student at Universidad EAN.
