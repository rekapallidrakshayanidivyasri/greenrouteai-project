import os
from flask import Flask, send_from_directory, jsonify, request

app = Flask(__name__, static_folder='frontend/dist', static_url_path='')

@app.route('/')
def serve_index():
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return "GreenRoute AI Python Server Online. Please build frontend dist."

@app.route('/api/health')
def health():
    return jsonify({
        "status": "online",
        "system": "GreenRoute AI ClimateTech Service",
        "engine": "Python Flask Web Engine"
    })

@app.errorhandler(404)
def not_found(e):
    if os.path.exists(os.path.join(app.static_folder, 'index.html')):
        return send_from_directory(app.static_folder, 'index.html')
    return jsonify({"error": "Resource not found"}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
