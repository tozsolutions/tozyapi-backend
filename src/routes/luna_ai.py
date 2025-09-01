from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from openai import OpenAI
import os
import json
import logging
from datetime import datetime

luna_bp = Blueprint('luna', __name__)
logger = logging.getLogger(__name__)

# OpenAI client setup
openai_client = None
if os.getenv('OPENAI_API_KEY'):
    openai_client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY'),
        base_url=os.getenv('OPENAI_API_BASE', 'https://api.openai.com/v1')
    )

# Luna'nın kişiliği ve bilgi tabanı
LUNA_SYSTEM_PROMPT = """
Sen Luna, Toz Yapı Teknolojileri'nin yapay zeka asistanısın. Nazik, yardımsever ve uzman bir danışmansın.

ŞİRKET BİLGİLERİ:
- Şirket: Toz Yapı Teknolojileri (2008'den beri)
- Slogan: "KEŞFEDİN! Belki de ihtiyacınız olan ürün burada"
- Adres: Üniversiteler Mah. 1597. Cad Bilkent Center AVM No:3 Bilkent Çankaya ANKARA
- Telefon: +90 536 773 14 04
- E-posta: merhaba@tozyapi.com.tr

ÜRÜN GRUPLARI:
1. Panjur Sistemleri (Otomatik, Manuel, Monoblok, Dıştan Takma)
2. Kepenk Sistemleri (Çelik, Alüminyum, Poliüretanlı)
3. Pergola ve RollingRoof Sistemleri
4. Bioclimatic Pergola Çözümleri
5. Zip Perde ve Giyotin Sistemleri
6. Kış Bahçesi Uygulamaları
7. Otomatik Kapı Sistemleri
8. Dış Cephe Jaluzileri
9. Havuz Kapama Çözümleri

İŞ ORTAKLARI: Somfy, Nice, Dorma, Alumil, Powerate, STR Grup, Albert Genau, Akseki

REFERANS PROJELERİ: Metromall AVM, TSE, Podium AVM, Mydonose, Corner Design, Pozitif ROI, Şehr-i Polat, Güzel Yalı, Bülent Ecevit Üniversitesi

GÖREVLER:
- Müşterileri nazikçe karşıla
- Ürünler hakkında detaylı bilgi ver
- Proje danışmanlığı yap
- Fiyat teklifi için iletişim bilgilerini yönlendir
- Teknik sorulara uzman cevaplar ver
- Her zaman pozitif ve çözüm odaklı ol

KONUŞMA TARZI:
- Türkçe konuş
- Nazik ve profesyonel ol
- Kısa ve anlaşılır cevaplar ver
- Emoji kullanma
- Müşteriyi "siz" diye hitap et
"""

@luna_bp.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    try:
        # Check if OpenAI is configured
        if not openai_client:
            return jsonify({'error': 'AI service not configured'}), 503
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request must be JSON'}), 400
            
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Mesaj boş olamaz'}), 400
            
        if len(user_message) > 1000:
            return jsonify({'error': 'Mesaj çok uzun (max 1000 karakter)'}), 400
        
        # OpenAI API çağrısı (Modern SDK)
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": LUNA_SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        luna_response = response.choices[0].message.content.strip()
        
        # Sohbet geçmişini kaydet
        log_chat(user_message, luna_response)
        
        return jsonify({
            'response': luna_response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f'Chat error: {str(e)}')
        return jsonify({'error': 'Bir hata oluştu, lütfen tekrar deneyin'}), 500

@luna_bp.route('/quick-responses', methods=['GET'])
@cross_origin()
def quick_responses():
    """Hızlı cevap önerileri"""
    responses = [
        "Panjur sistemleri hakkında bilgi almak istiyorum",
        "Pergola fiyatları nedir?",
        "Hangi şehirlerde hizmet veriyorsunuz?",
        "Montaj hizmeti veriyor musunuz?",
        "Otomatik kepenk sistemleri nasıl çalışır?",
        "Kış bahçesi için çözümleriniz neler?",
        "Proje danışmanlığı alabilir miyim?"
    ]
    
    return jsonify({'quick_responses': responses})

@luna_bp.route('/product-info/<product_type>', methods=['GET'])
@cross_origin()
def product_info(product_type):
    """Ürün bilgileri"""
    products = {
        'panjur': {
            'name': 'Panjur Sistemleri',
            'description': 'Otomatik, manuel, monoblok ve dıştan takma panjur çeşitleri',
            'features': ['Güneş koruması', 'Enerji tasarrufu', 'Güvenlik', 'Estetik'],
            'applications': ['Konut', 'Ofis', 'Ticari mekanlar']
        },
        'kepenk': {
            'name': 'Kepenk Sistemleri',
            'description': 'Çelik, alüminyum ve poliüretanlı kepenk sistemleri',
            'features': ['Yüksek güvenlik', 'Dayanıklılık', 'Otomatik kontrol', 'Ses yalıtımı'],
            'applications': ['Dükkan', 'Mağaza', 'Endüstriyel tesisler']
        },
        'pergola': {
            'name': 'Pergola Sistemleri',
            'description': 'Bioclimatic pergola ve RollingRoof çözümleri',
            'features': ['Hava koşullarına adaptasyon', 'Akıllı kontrol', 'Estetik tasarım', 'Dayanıklılık'],
            'applications': ['Bahçe', 'Teras', 'Restoran', 'Kafe']
        }
    }
    
    product = products.get(product_type.lower())
    if not product:
        return jsonify({'error': 'Ürün bulunamadı'}), 404
    
    return jsonify(product)

def log_chat(user_message, luna_response):
    """Sohbet geçmişini kaydet"""
    try:
        log_entry = {
            'timestamp': datetime.now().isoformat(),
            'user_message': user_message,
            'luna_response': luna_response
        }
        
        # Get log file path from environment or use default
        log_dir = os.getenv('LOG_DIR', '/tmp')
        log_file = os.path.join(log_dir, 'chat_logs.json')
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        
        if os.path.exists(log_file):
            try:
                with open(log_file, 'r', encoding='utf-8') as f:
                    logs = json.load(f)
            except (json.JSONDecodeError, IOError):
                logs = []
        else:
            logs = []
        
        logs.append(log_entry)
        
        # Son 1000 mesajı tut
        if len(logs) > 1000:
            logs = logs[-1000:]
        
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(logs, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        logger.error(f"Log kaydetme hatası: {e}")

