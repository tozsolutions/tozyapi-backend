from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS with specific origins for production
cors_origins = os.getenv('CORS_ORIGINS', '*').split(',')
CORS(app, origins=cors_origins, supports_credentials=True)

# Configure logging
log_level = os.getenv('LOG_LEVEL', 'INFO')
logging.basicConfig(
    level=getattr(logging, log_level),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# OpenAI client configuration (Modern SDK)
openai_client = None
if os.getenv('OPENAI_API_KEY'):
    openai_client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY'),
        base_url=os.getenv('OPENAI_API_BASE', 'https://api.openai.com/v1')
    )
    logger.info("OpenAI client configured successfully")
else:
    logger.warning("OPENAI_API_KEY not found in environment variables")

# Import and register blueprints
try:
    from routes.luna_ai import luna_bp
    app.register_blueprint(luna_bp, url_prefix='/api/luna')
    logger.info("Luna AI blueprint registered successfully")
except ImportError as e:
    logger.error(f"Failed to import luna_ai blueprint: {e}")

@app.route('/')
def home():
    return jsonify({
        "message": "TOZ Yapı Teknolojileri API", 
        "status": "active",
        "version": "1.0.0"
    })

@app.route('/health')
def health():
    """Health check endpoint for production monitoring"""
    health_status = {
        "status": "healthy",
        "timestamp": os.getenv('DEPLOY_TIME', 'unknown'),
        "openai_configured": openai_client is not None
    }
    return jsonify(health_status)

@app.route('/api/luna/chat', methods=['POST'])
def luna_chat():
    try:
        # Check if OpenAI is configured
        if not openai_client:
            return jsonify({
                "error": "AI service is not configured",
                "status": "error"
            }), 503
            
        # Validate request data
        if not request.is_json:
            return jsonify({
                "error": "Request must be JSON",
                "status": "error"
            }), 400
            
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                "error": "Message cannot be empty",
                "status": "error"
            }), 400
            
        if len(user_message) > 1000:
            return jsonify({
                "error": "Message too long (max 1000 characters)",
                "status": "error"
            }), 400
        
        # Create AI response using modern SDK
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen Toz Yapı Teknolojileri'nin AI asistanı Luna'sın. Yapı, inşaat, mimari ve teknoloji konularında yardımcı oluyorsun. Kısa ve öz cevaplar ver."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        return jsonify({
            "response": response.choices[0].message.content,
            "status": "success"
        })
        
    except Exception as e:
        logger.error(f"Luna chat error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "status": "error"
        }), 500

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
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting TOZ Yapı API server on port {port}")
    logger.info(f"Debug mode: {debug}")
    logger.info(f"OpenAI configured: {openai_client is not None}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)