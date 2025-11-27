# DivLookup

A simple web app to lookup distribution history of companies and ETFs.

Live demo of it up (barring AWS costs 😄) at: http://divlookup.paulisbuildingstuff.com/
![searech-page](search-page.png)
![result-page](result-page.png)

## Prerequisites

- Node.js (v18 or higher recommended)
- Python (v3.8 or higher recommended)

## How to run

```bash
# Backend setup
cd backend
python3 -m venv venv

source venv/bin/activate
pip install -r requirements.txt
python app.py

# Front-end setup
cd /to/div-lookup
npm install
npm run dev
```
