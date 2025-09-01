from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv
from routes.luna_ai import luna_bp

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.getenv('LOG_FILE', 'app.log')),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Configure CORS
CORS(app, origins=['*'])  # In production, specify exact origins

# Register blueprints
app.register_blueprint(luna_bp, url_prefix='/api/luna')

# Initialize OpenAI client (NEW SDK) only if API key is available
client = None
if os.getenv('OPENAI_API_KEY'):
    try:
        from openai import OpenAI
        client = OpenAI(
            api_key=os.getenv('OPENAI_API_KEY'),
            base_url=os.getenv('OPENAI_API_BASE', 'https://api.openai.com/v1')
        )
    except ImportError:
        logger.error("OpenAI package not installed")
    except Exception as e:
        logger.error(f"Failed to initialize OpenAI client: {e}")
else:
    logger.warning("OpenAI API key not configured")

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        "message": "TOZ Yapı Teknolojileri API", 
        "status": "active",
        "version": "1.0.0"
    })

@app.route('/health')
def health_check():
    """Detailed health check for monitoring"""
    try:
        # Check OpenAI API key
        api_key_status = "configured" if os.getenv('OPENAI_API_KEY') else "missing"
        openai_status = "available" if client else "unavailable"
        
        return jsonify({
            "status": "healthy",
            "timestamp": os.popen('date -Iseconds').read().strip(),
            "services": {
                "openai_key": api_key_status,
                "openai_client": openai_status,
                "flask": "running"
            }
        })
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            "status": "unhealthy",
            "error": str(e)
        }), 500

@app.route('/api/luna/chat', methods=['POST'])
def luna_chat():
    """Legacy endpoint - redirects to new Luna blueprint"""
    try:
        data = request.json
        if not data or not data.get('message'):
            return jsonify({"error": "Message is required", "status": "error"}), 400
            
        user_message = data.get('message', '')
        
        # Validate API key
        if not client:
            return jsonify({"error": "OpenAI API key not configured", "status": "error"}), 500
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sen Toz Yapı Teknolojileri'nin AI asistanı Luna'sın. Yapı, inşaat, mimari ve teknoloji konularında yardımcı oluyorsun."},
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
        logger.error(f"Luna chat error: {e}")
        return jsonify({"error": str(e), "status": "error"}), 500

@app.route('/api/luna/quick-responses', methods=['GET'])
def quick_responses():
    """Legacy endpoint for quick responses"""
    return jsonify({
        "responses": [
            "Toz Yapı hakkında bilgi almak istiyorum",
            "Projelerinizi görmek istiyorum",
            "İletişime geçmek istiyorum",
            "Teknoloji çözümleriniz nelerdir?"
        ]
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found", "status": "error"}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error", "status": "error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting server on {host}:{port} (debug={debug})")
    app.run(host=host, port=port, debug=debug)