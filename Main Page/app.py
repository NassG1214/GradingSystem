from flask import Flask, request, jsonify, send_from_directory, redirect, url_for, render_template
import json

app = Flask(__name__)

# Load validation data from JSON file
def load_validation_data():
    with open('Website/data/validation_data.json') as f:
        return json.load(f)

validation_data = load_validation_data()

# Serve the HTML files
@app.route('/')
def index():
    return send_from_directory('Website/Main Page', 'LoginPage.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type')

    users = validation_data.get(user_type)
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)

    if user:
        return jsonify({"redirectUrl": user["redirectUrl"]})
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Serve static files
@app.route('/<path:path>')
def serve_file(path):
    return send_from_directory('Website', path)

if __name__ == '__main__':
    app.run(debug=True)
