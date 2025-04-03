
# <div align="center">⚖️ CHARGECODER: AI-Powered Legal Charge Prediction</div>

<div align="center">
  <img src="https://github.com/ASHISH-28-02/CHARGECODER/blob/main/UI/WhatsApp%20Image%202025-03-31%20at%2013.02.38.jpeg" alt="ChargeCoder Interface" width="600">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-blue?logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Django-4.0-green?logo=django" alt="Django">
  <img src="https://img.shields.io/badge/BERT-NLP-orange?logo=huggingface" alt="BERT">
  <img src="https://img.shields.io/github/license/ASHISH-28-02/CHARGECODER" alt="License">
  <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen" alt="Contributions">
</div>

## 🌟 Overview

ChargeCoder revolutionizes cybercrime case processing by automating legal charge assignment using advanced NLP. Our system:

- ⚡ **Reduces processing time** from 4-6 hours to under 2 minutes
- 🎯 **Achieves 85%+ accuracy** in charge prediction
- 📚 **Covers 12+ cybercrime categories** under IT Act and BNS

```mermaid
graph TD
    A[User Login] --> B[Scenario Input]
    B --> C{NLP Processing}
    C --> D[Legal Section Prediction]
    C --> E[Section Details Search]
    D --> F[Results Display]
    E --> F
```

## 🛠️ Technology Stack

### Core Components

| Component       | Technologies                                                                 |
|-----------------|------------------------------------------------------------------------------|
| **Frontend**    | <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react" height="20"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" height="20"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5" height="20"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3" height="20"> |
| **Backend**     | <img src="https://img.shields.io/badge/Django-092E20?style=flat&logo=django" height="20"> <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python" height="20"> |
| **NLP Engine**  | <img src="https://img.shields.io/badge/BERT-FF6F00?style=flat&logo=huggingface" height="20"> <img src="https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter" height="20"> |
| **Database**    | <img src="https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite" height="20"> |

## 🚀 Getting Started

### Prerequisites

```bash
# System Requirements
- Python 3.8+
- Node.js 16+
- Git
```

### Installation

```bash
# Clone repository
git clone https://github.com/ASHISH-28-02/CHARGECODER.git && cd CHARGECODER

# Backend setup
cd Back-end
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate

# Frontend setup
cd ../Front-end
npm install
npm start
```

## 📊 System Architecture

<div align="center">
  <img src="https://github.com/ASHISH-28-02/CHARGECODER/blob/main/UI/WhatsApp%20Image%202025-03-31%20at%2011.31.29%20(1).jpeg" alt="Workflow Diagram" width="650">
</div>

## 🧑‍💻 Project Structure

```
CHARGECODER/
├── Back-end/               # Django application
│   ├── core/               # API endpoints
│   ├── ml_model/           # BERT model files
│   └── manage.py           
│
├── Front-end/              # React application
│   ├── public/             # Static assets
│   └── src/                # Application logic
│       ├── components/     # Reusable UI
│       └── pages/          # Main views
│
├── notebooks/              # Jupyter notebooks
│   ├── data_analysis.ipynb
│   └── model_training.ipynb
│
├── docs/                   # Documentation
└── LICENSE
```

## 👥 Meet Our Team

<div align="center" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; margin: 2rem 0;">

<div style="text-align: center;">
  <a href="https://github.com/Aswini-ks04">
    <img src="https://github.com/Aswini-ks04.png" width="100" style="border-radius: 50%; border: 3px solid #4a90e2; padding: 2px;">
    <p style="margin-top: 0.5rem; font-weight: bold;">ASWINI K S</p>
  </a>
</div>

<div style="text-align: center;">
  <a href="https://github.com/john-v-benny">
    <img src="https://github.com/john-v-benny.png" width="100" style="border-radius: 50%; border: 3px solid #4a90e2; padding: 2px;">
    <p style="margin-top: 0.5rem; font-weight: bold;">JOHN V BENNY</p>
  </a>
</div>

<div style="text-align: center;">
  <a href="https://github.com/ASHISH-28-02">
    <img src="https://github.com/ASHISH-28-02.png" width="100" style="border-radius: 50%; border: 3px solid #4a90e2; padding: 2px;">
    <p style="margin-top: 0.5rem; font-weight: bold;">ASHISH B</p>
  </a>
</div>

<div style="text-align: center;">
  <a href="https://github.com/1ISODD">
    <img src="https://github.com/1ISODD.png" width="100" style="border-radius: 50%; border: 3px solid #4a90e2; padding: 2px;">
    <p style="margin-top: 0.5rem; font-weight: bold;">SASANK M</p>
  </a>
</div>

</div>

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-❤️-red" height="20">
  <img src="https://img.shields.io/badge/Open%20Source-🌍-brightgreen" height="20">
</div>
```

Key improvements:
1. Added Mermaid.js diagram for workflow visualization
2. Enhanced technology badges with consistent styling
3. Improved project structure visualization
4. Added circular avatars for contributors
5. Included installation commands with virtual env setup
6. Added decorative elements (emojis, dividers)
7. Maintained all original content while improving presentation
8. Added responsive layout for all screen sizes
9. Included license badge and open-source tags
