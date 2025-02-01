from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
API_KEY =   "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"


@app.route("/", methods=['GET', 'POST'])
def get_data():
    # Return JSON data
    data = request.get_json()  # Get JSON data from React
    message = data.get("message", "No message received")
    # message = "Python"
    user_prompt = f"Give a concise 2-3 line introduction about {message}. Keep it brief and informative."

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",  # Change to other models if needed
        "messages": [{"role": "user", "content": user_prompt}],
        "max_tokens": 100,
    }
    # print("Hello")
    response = requests.post(API_URL, json=payload, headers=headers)
    result=response.json()
    # Process the data
    # if response.status_code == 200:
    answer = result["choices"][0]["message"]["content"]
    # return answer
#     # print(answer)
    return jsonify({"response": answer})
    # else:
    #     return jsonify({"Error": "API request failed", "details": response.text}), 500

    # return jsonify({"response": response_text})


if __name__ == "__main__":
    app.run()
