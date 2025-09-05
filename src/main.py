from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Modern OpenAI SDK
try:
	from openai import OpenAI
except Exception:
	OpenAI = None

load_dotenv()

app = Flask(__name__)
CORS(app)


def get_openai_client():
	"""OpenAI istemcisini döndürür. API anahtarı zorunludur."""
	if OpenAI is None:
		raise RuntimeError("OpenAI SDK yüklü değil. 'pip install openai' ile kurun.")
	api_key = os.getenv('OPENAI_API_KEY')
	if not api_key:
		raise RuntimeError("OPENAI_API_KEY tanımlı değil.")
	base_url = os.getenv('OPENAI_BASE_URL') or os.getenv('OPENAI_API_BASE')
	if base_url:
		return OpenAI(api_key=api_key, base_url=base_url)
	return OpenAI(api_key=api_key)


@app.route('/')
def home():
	return jsonify({"message": "TOZ Yapı Teknolojileri API", "status": "active"})


@app.route('/api/luna/chat', methods=['POST'])
def luna_chat():
	try:
		data = request.get_json(silent=True) or {}
		user_message = (data.get('message') or '').strip()
		if not user_message:
			return jsonify({"error": "message alanı zorunludur"}), 400

		client = get_openai_client()
		completion = client.chat.completions.create(
			model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
			messages=[
				{"role": "system", "content": "Sen Toz Yapı Teknolojileri'nin AI asistanı Luna'sın. Yapı, inşaat, mimari ve teknoloji konularında yardımcı oluyorsun."},
				{"role": "user", "content": user_message}
			],
			temperature=0.7,
		)

		assistant_message = completion.choices[0].message.content if completion.choices else ""
		return jsonify({"response": assistant_message, "status": "success"})
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