from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_talisman import Talisman
import os
import logging
from datetime import datetime
from dotenv import load_dotenv

# Import routes
from routes.luna_ai import luna_bp

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__)

# Security configuration
if os.getenv('FLASK_ENV') == 'production':
    Talisman(app, force_https=True)

# CORS configuration
CORS(app, 
     origins=os.getenv('ALLOWED_ORIGINS', '*').split(','),
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization'])

# Register blueprints
app.register_blueprint(luna_bp, url_prefix='/api/luna')

@app.route('/')
def home():
    return jsonify({
        "message": "TOZ Yapı Teknolojileri API", 
        "status": "active",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/health')
def health_check():
    """Health check endpoint for monitoring"""
    try:
        # Basic health checks
        health_status = {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "version": "1.0.0",
            "environment": os.getenv('FLASK_ENV', 'development'),
            "checks": {
                "openai_api_key": "configured" if os.getenv('OPENAI_API_KEY') else "missing"
            }
        }
        return jsonify(health_status)
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }), 500

@app.route('/api/status')
def api_status():
    """API status endpoint"""
    return jsonify({
        "api": "TOZ Yapı Teknolojileri API",
        "status": "operational",
        "endpoints": {
            "luna_chat": "/api/luna/chat",
            "luna_quick_responses": "/api/luna/quick-responses",
            "luna_product_info": "/api/luna/product-info/<product_type>",
            "health": "/health",
            "status": "/api/status"
        },
        "timestamp": datetime.now().isoformat()
    })

# Legacy endpoint for backward compatibility
@app.route('/api/luna/chat', methods=['POST'])
def luna_chat_legacy():
    """Legacy endpoint - redirects to proper blueprint"""
    from flask import redirect, url_for
    return redirect(url_for('luna.chat'), code=307)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found",
        "message": "The requested endpoint does not exist",
        "status": 404
    }), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({
        "error": "Internal server error",
        "message": "An unexpected error occurred",
        "status": 500
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)