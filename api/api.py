from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route("/api/data")
def get_data():
    # Return JSON data
    return jsonify({"message": " Hello This is the data you requested!"})


if __name__ == "__main__":
    app.run(debug=True)
