# PatentSpark

## 🚀 An AI Agent Concept for Viable Patent Discovery
This project was developed for the Students for Energy and Entrepreneurial Development (SEED) 2026 internship at Argonne National Laboratory, coordinated by the Chain Reactions Innovations (CRI). 

This group project is a proof-of-concept design and prototype of an AI tool that assists with a gap found in the entrepreneurship process​, mainly with patent discovery and viable startup ideas.

Multiple concepts were created and considered for the AI tool for Energy and Entrepreneurship project theme, but ultimately, this idea was the most viable for the purposes of our internship.

Given a target sector, the tool will output a few patent ideas, providing a name idea, patent summary, scientific breakdown, value proposition and analysis, key stakeholders, market sizing, and a viability rating out of ten.

The web application is designed with Figma, and the tech stack built with Python Flask for the backend, React + Vite + TailwindCSS for the frontend. It is powered by the Google Gemini API, specifically Google Gemini Flash + Lite 3.5.

## 🗝️ Prerequisites
To properly run this prototype, the following prerequisites are required.

* Node.js (v22.13+ recommended)
* Python (v3.13+ recommended)
* pip (Python package manager, v26.1+ recommended)
* A valid Google Gemini API key

Steps to install each are listed below.

## 💾 Cloning Repository
1. Install VSCode or any IDE of your choice: https://code.visualstudio.com/.
2. Clone the repository in the terminal: `git clone https://github.com/abyssaldragonz/viable-patent-discovery-ai.git`.
3. Continute onto backend and frontend setup.

## ⚙️ Backend Setup (Python Flask)
1. Install Python here: https://www.python.org/.

2. Install Python dependencies in the terminal:
`pip install -r requirements.txt`.

3. Create a `.env` file at the root: `touch .env`.

4. Input your valid Google Gemini API key into the `.env` file: `API_KEY="sample_key"`.

5. Run the Flask server: `python main.py`.

The backend server will start at http://localhost:5000.


## 💻 Frontend Setup (React Vite)
1. Install Node here: https://nodejs.org/.

2. Open a new terminal and install Node dependencies: `npm install`.

3. Start the React Development Server: `npm run dev`.

The frontend will start at http://localhost:5173 (default Vite port).


## 📜 Documentation
```
viable-patent-discovery-ai/
├── .env                # Create your .env file here!
├── requirements.txt    # Python dependencies
├── package.json        # React dependencies
├── main.py             # Flask backend code
├── src/                # React App source code
│   └── components/     # Additional React components
│   └── App.jsx         # Main React component
│   └── ...
└── ...
```

## ⭐ Credits
SEED Cohort 2026:
* [Josephine Lee](https://www.linkedin.com/in/josephine-b-l/)
* [Bilal Baig](https://www.linkedin.com/in/bilal-baig-7694271b0/)
* [Sophia Giampaolo](https://www.linkedin.com/in/sophiagiampaolo/)
* Meyaz Hasan
* [Alex Lukas​](https://www.linkedin.com/in/alex-lukas-285937328/)
​

Thank you to Mel Delpech, Deena Wright, and the rest of the CRI team for coordinating the SEED Internship.​ It has been a wonderful experience. Learn more here: https://chainreaction.anl.gov/.