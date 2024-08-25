from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace these values with your actual details
USER_ID = "john_doe_17091999"
EMAIL = "john@xyz.com"
ROLL_NUMBER = "21BBS0194"

@app.route('/')
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/bfhl', methods=['POST'])
def handle_post():
    data = request.json.get('data', [])
    
    # Separate numbers and alphabets
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha()]
    
    # Extract lowercase letters and find the highest one
    lowercase_alphabets = [char for char in alphabets if char.islower()]
    highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None
    
    response = {
        "is_success": True,
        "user_id": USER_ID,
        "email": EMAIL,
        "roll_number": ROLL_NUMBER,
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
    }
    
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def handle_get():
    response = {
        "operation_code": 1
    }
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
