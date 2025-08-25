from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import openai
import os
import json
from datetime import datetime

luna_bp = Blueprint('luna', __name__)

# OpenAI API ayarları
openai.api_key = os.getenv('OPENAI_API_KEY')
openai.api_base = os.getenv('OPENAI_API_BASE')

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
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Mesaj boş olamaz'}), 400
        
        # OpenAI API çağrısı
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": LUNA_SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        luna_response = response.choices[0].message.content.strip()
        
        # Sohbet geçmişini kaydet (basit log)
        log_chat(user_message, luna_response)
        
        return jsonify({
            'response': luna_response,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': f'Bir hata oluştu: {str(e)}'}), 500

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
        
        # Basit dosya tabanlı log
        log_file = '/home/ubuntu/tozyapi-backend/chat_logs.json'
        
        if os.path.exists(log_file):
            with open(log_file, 'r', encoding='utf-8') as f:
                logs = json.load(f)
        else:
            logs = []
        
        logs.append(log_entry)
        
        # Son 1000 mesajı tut
        if len(logs) > 1000:
            logs = logs[-1000:]
        
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(logs, f, ensure_ascii=False, indent=2)
            
    except Exception as e:
        print(f"Log kaydetme hatası: {e}")

