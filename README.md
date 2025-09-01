# TOZ Yapı Teknolojileri - API ve Web Sitesi

## 📋 Proje Genel Bakış

Bu proje TOZ Yapı Teknolojileri için Flask tabanlı bir API backend'i ve modern HTML/CSS/JavaScript frontend'i içerir. Luna AI asistanı entegrasyonu ile müşteri hizmetleri geliştirilmiştir.

## 🏗️ Mimari

### Backend
- **Framework**: Flask 3.0.0
- **AI Integration**: OpenAI GPT-3.5-turbo 
- **Database**: Dosya tabanlı JSON logging
- **Production Server**: Gunicorn

### Frontend  
- **Core**: HTML5, CSS3, Vanilla JavaScript
- **AI Chat**: Luna AI asistanı
- **Responsive**: Mobile-first tasarım
- **Deployment**: Netlify/Static hosting

## 🚀 Hızlı Başlangıç

### 1. Gereksinimler
```bash
Python 3.8+
pip
```

### 2. Kurulum
```bash
# Repository klonla
git clone https://github.com/tozsolutions/tozyapi-backend.git
cd tozyapi-backend

# Python dependencies yükle
pip install -r requirements.txt

# Environment variables ayarla
cp .env.example .env
# .env dosyasını düzenleyin
```

### 3. Environment Variables (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key_here
LOG_LEVEL=INFO
LOG_DIR=/tmp
PORT=5000
CORS_ORIGINS=*
```

### 4. Development Server Çalıştırma
```bash
cd src
python main.py
```

Server http://localhost:5000 adresinde çalışacaktır.

## 📡 API Endpoints

### Health Check
```
GET /health
Response: {
  "status": "healthy",
  "timestamp": "production",
  "openai_configured": true
}
```

### Ana Endpoint
```
GET /
Response: {
  "message": "TOZ Yapı Teknolojileri API",
  "status": "active",
  "version": "1.0.0"
}
```

### Luna AI Chat
```
POST /api/luna/chat
Content-Type: application/json
Body: {
  "message": "Panjur sistemleri hakkında bilgi almak istiyorum"
}

Response: {
  "response": "Panjur sistemlerimiz...",
  "status": "success"
}
```

### Quick Responses
```
GET /api/luna/quick-responses
Response: {
  "quick_responses": [
    "Panjur sistemleri hakkında bilgi almak istiyorum",
    "Pergola fiyatları nedir?",
    ...
  ]
}
```

### Ürün Bilgileri
```
GET /api/luna/product-info/{product_type}
Desteklenen ürünler: panjur, kepenk, pergola

Response: {
  "name": "Panjur Sistemleri",
  "description": "...",
  "features": [...],
  "applications": [...]
}
```

## 🧪 Test Etme

```bash
# Unit testleri çalıştır
python -m unittest tests.test_api -v

# API'yi manuel test et
curl http://localhost:5000/health
curl -X POST http://localhost:5000/api/luna/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Test mesajı"}'
```

## 🚀 Production Deployment

### Heroku Deployment
```bash
# Heroku CLI yükleyin ve login olun
heroku create tozyapi-backend
heroku config:set OPENAI_API_KEY=your_key_here
heroku config:set FLASK_ENV=production
heroku config:set FLASK_DEBUG=False
git push heroku main
```

### Railway Deployment
```bash
# Railway CLI yükleyin
railway login
railway new
railway add
railway deploy
```

### Environment Variables (Production)
```env
OPENAI_API_KEY=sk-...
OPENAI_API_BASE=https://api.openai.com/v1
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=secure_random_key_here
LOG_LEVEL=INFO
LOG_DIR=/tmp
PORT=5000
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## 🌐 Frontend Deployment

### Netlify Deployment
1. GitHub repository'yi Netlify'e bağlayın
2. Build settings:
   - Build command: `echo "Static site - no build needed"`
   - Publish directory: `.`
3. Environment variables:
   - `REACT_APP_API_URL`: Backend URL

### Custom Domain
1. Domain DNS ayarlarında Netlify'i gösterin
2. SSL sertifikası otomatik etkinleştirilir

## 🔧 Geliştirme

### Kod Yapısı
```
/
├── src/                     # Backend kaynak kodu
│   ├── main.py             # Ana Flask uygulaması
│   ├── routes/             # API route'ları
│   │   └── luna_ai.py      # Luna AI endpoints
│   └── static/             # Static dosyalar
├── tests/                  # Test dosyaları
├── css/                    # Frontend CSS
├── js/                     # Frontend JavaScript
├── images/                 # Görseller
├── requirements.txt        # Python dependencies
├── Procfile               # Heroku deployment
├── .env.example           # Environment template
└── README.md              # Bu dosya
```

### Yeni Özellik Ekleme
1. Backend: `src/routes/` altına yeni route dosyası ekleyin
2. Frontend: `js/` altına yeni JavaScript modülleri ekleyin
3. CSS: `css/` altına stil dosyaları ekleyin
4. Test: `tests/` altına unit testler ekleyin

### Debugging
```bash
# Debug mode'da çalıştır
export FLASK_DEBUG=True
export LOG_LEVEL=DEBUG
python src/main.py

# Logları izle
tail -f /tmp/chat_logs.json
```

## 📊 Monitoring ve Logging

### Log Dosyaları
- Chat logs: `/tmp/chat_logs.json` (son 1000 mesaj)
- Application logs: Console output

### Health Monitoring
- Health endpoint: `GET /health`
- Production monitoring servisleri önerilir (Sentry, NewRelic)

## 🔒 Güvenlik

### Best Practices
- API key'leri environment variables'da tutun
- CORS'u production'da specific domain'lere kısıtlayın
- Rate limiting ekleyin (gelecek geliştirme)
- Input validation mevcut
- Error handling güvenli (detay vermez)

## 📈 Performance

### Optimizasyonlar
- Gunicorn worker sayısını ayarlayın (varsayılan: 2)
- CDN kullanın (Cloudflare önerilir)
- Image optimization
- CSS/JS minification (gelecek geliştirme)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit yapın (`git commit -am 'Yeni özellik: açıklama'`)
4. Push yapın (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 Destek

- **Email**: merhaba@tozyapi.com.tr
- **Telefon**: +90 536 773 14 04
- **GitHub Issues**: Teknik sorunlar için

## 📝 Lisans

Bu proje TOZ Yapı Teknolojileri'ne aittir. Tüm hakları saklıdır.

---
**Son Güncelleme**: 1 Eylül 2025  
**Versiyon**: 1.0.0