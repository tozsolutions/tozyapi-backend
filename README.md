# TOZ Yapı Teknolojileri API Backend

**Luna AI Asistanı** - TOZ Yapı Teknolojileri'nin yapay zeka destekli müşteri hizmetleri API'si

## 🏗️ Özellikler

- **Luna AI Chat**: OpenAI GPT-3.5-turbo destekli sohbet asistanı
- **Ürün Bilgileri**: Panjur, kepenk, pergola sistemleri hakkında detaylı bilgi
- **Hızlı Cevaplar**: Sık sorulan sorular için hazır cevaplar
- **Health Check**: Sistem durumu ve API sağlık kontrolü
- **Logging**: Kapsamlı loglama ve hata takibi
- **Production Ready**: Gunicorn, Docker ve deployment desteği

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Python 3.12+
- OpenAI API anahtarı (isteğe bağlı, demo için gerekli değil)

### Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone <repository-url>
cd tozyapi-backend
```

2. **Bağımlılıkları yükleyin:**
```bash
pip install -r requirements.txt
```

3. **Çevre değişkenlerini ayarlayın:**
```bash
cp .env.example .env
# .env dosyasını düzenleyin ve OpenAI API anahtarınızı ekleyin
```

4. **Uygulamayı çalıştırın:**
```bash
cd src
python main.py
```

API'ye `http://localhost:5000` adresinden erişebilirsiniz.

## 🔧 Yapılandırma

### Çevre Değişkenleri

| Değişken | Açıklama | Varsayılan |
|----------|----------|------------|
| `OPENAI_API_KEY` | OpenAI API anahtarı | - |
| `OPENAI_API_BASE` | OpenAI API base URL | `https://api.openai.com/v1` |
| `FLASK_ENV` | Flask ortamı | `production` |
| `FLASK_DEBUG` | Debug modu | `False` |
| `PORT` | Sunucu portu | `5000` |
| `HOST` | Sunucu IP adresi | `0.0.0.0` |
| `LOG_LEVEL` | Log seviyesi | `INFO` |
| `LOG_FILE` | Log dosyası | `app.log` |
| `SECRET_KEY` | Flask secret key | `dev-secret-key-change-in-production` |

## 📡 API Endpoints

### Temel Endpoints

- `GET /` - Ana sayfa ve API durumu
- `GET /health` - Detaylı sağlık kontrolü

### Luna AI Endpoints

- `POST /api/luna/chat` - AI sohbet
- `GET /api/luna/quick-responses` - Hızlı cevap önerileri
- `GET /api/luna/product-info/<product_type>` - Ürün bilgileri

### API Kullanımı

#### Luna ile Sohbet
```bash
curl -X POST http://localhost:5000/api/luna/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Panjur sistemleri hakkında bilgi alabilir miyim?"}'
```

#### Ürün Bilgileri
```bash
curl http://localhost:5000/api/luna/product-info/panjur
```

## 🐳 Docker ile Çalıştırma

### Docker Build ve Run
```bash
docker build -t tozyapi-backend .
docker run -p 5000:5000 --env-file .env tozyapi-backend
```

### Docker Compose
```bash
docker-compose up -d
```

## 🚀 Production Deployment

### Heroku Deployment

1. **Heroku CLI'yi yükleyin ve giriş yapın**
2. **Uygulama oluşturun:**
```bash
heroku create your-app-name
```

3. **Çevre değişkenlerini ayarlayın:**
```bash
heroku config:set OPENAI_API_KEY=your_key_here
heroku config:set SECRET_KEY=your_secret_key_here
```

4. **Deploy edin:**
```bash
git push heroku main
```

### Render Deployment

1. **GitHub repository'sini Render'a bağlayın**
2. **Environment variables'ları ayarlayın**
3. **Build ve start komutlarını yapılandırın:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd src && gunicorn --bind 0.0.0.0:$PORT main:app`

## 🔍 Monitoring ve Logging

### Health Check
Uygulamanızın durumunu kontrol etmek için:
```bash
curl http://your-domain.com/health
```

### Log Dosyaları
- Uygulama logları: `app.log`
- Chat geçmişi: `chat_logs.json`

## 🛡️ Güvenlik

- CORS koruması aktif
- Input validation
- Rate limiting (production'da önerilir)
- API key güvenliği
- Error handling

## 🧪 Test

Temel endpoint testleri:
```bash
# Sağlık kontrolü
curl http://localhost:5000/health

# Luna quick responses
curl http://localhost:5000/api/luna/quick-responses

# Ürün bilgisi
curl http://localhost:5000/api/luna/product-info/pergola
```

## 📁 Proje Yapısı

```
tozyapi-backend/
├── src/
│   ├── main.py              # Ana Flask uygulaması
│   ├── routes/
│   │   └── luna_ai.py       # Luna AI endpoints
│   └── static/              # Static dosyalar
├── requirements.txt         # Python bağımlılıkları
├── Dockerfile              # Docker yapılandırması
├── docker-compose.yml      # Docker Compose
├── Procfile                # Heroku deployment
├── runtime.txt             # Python versiyonu
├── .env.example            # Çevre değişkenleri örneği
└── README.md               # Bu dosya
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje TOZ Yapı Teknolojileri tarafından geliştirilmiştir.

## 📞 İletişim

- **Web**: https://tozyapi.com.tr
- **E-posta**: merhaba@tozyapi.com.tr
- **Telefon**: +90 536 773 14 04
- **Adres**: Üniversiteler Mah. 1597. Cad Bilkent Center AVM No:3 Bilkent Çankaya ANKARA

---

**TOZ Yapı Teknolojileri** - "KEŞFEDİN! Belki de ihtiyacınız olan ürün burada" 🏗️