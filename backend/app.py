from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/companies', methods=['GET'])
def search_companies():
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    try:
        # Use requests to hit Yahoo's search API directly as yfinance doesn't expose a search method
        # We use a standard User-Agent to avoid some 429s
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        url = f"https://query1.finance.yahoo.com/v1/finance/search?q={query}&quotesCount=5&newsCount=0"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        quotes = data.get('quotes', [])
        results = []
        for quote in quotes:
            if quote.get('quoteType') in ['EQUITY', 'ETF']:
                results.append({
                    'ticker': quote.get('symbol'),
                    'name': quote.get('shortname') or quote.get('longname') or quote.get('symbol')
                })
        return jsonify(results)
    except Exception as e:
        print(f"Error searching companies: {e}")
        return jsonify([]), 500

@app.route('/api/companies/<ticker>', methods=['GET'])
def get_company_details(ticker):
    try:
        # Use yfinance to get ticker details
        stock = yf.Ticker(ticker)
        
        # Get dividends
        # yfinance returns a pandas Series with Date index
        dividends_series = stock.dividends
        
        dividends = []
        # Fetch all available history
        
        # Convert to list of dicts
        # Iterate over the series
        for date, amount in dividends_series.items():
            dividends.append({
                'date': date.strftime('%Y-%m-%d'),
                'amount': float(amount)
            })
            
        # Sort descending
        dividends.sort(key=lambda x: x['date'], reverse=True)
        
        # Get company info
        info = stock.info
        name = info.get('shortName') or info.get('longName') or ticker
        
        return jsonify({
            'ticker': ticker,
            'name': name,
            'dividends': dividends
        })
    except Exception as e:
        print(f"Error fetching details for {ticker}: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
