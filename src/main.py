from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAI API yapılandırması (ESKI SDK)
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_base = os.getenv('OPENAI_API_BASE', 'https://api.openai.com/v1')

@app.route('/')
def home():
    return jsonify({"message": "TOZ Yapı Teknolojileri API", "status": "active"})

@app.route('/api/luna/chat', methods=['POST'])
def luna_chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen Toz Yapı Teknolojileri'nin AI asistanı Luna'sın. Yapı, inşaat, mimari ve teknoloji konularında yardımcı oluyorsun."},
                {"role": "user", "content": user_message}
            ]
        )
        
        return jsonify({
            "response": response.choices[0].message.content,
            "status": "success"
        })
    except Exception as e:
        return jsonify({"error": str(e), "status": "error"}), 500

@app.route('/api/luna/quick-responses', methods=['GET'])
def quick_responses():
    return jsonify({
        "responses": [
            "Toz Yapı hakkında bilgi almak istiyorum",
            "Projelerinizi görmek istiyorum",
            "İletişime geçmek istiyorum",
            "Teknoloji çözümleriniz nelerdir?"
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)