# Toz Yapı Teknolojileri Web Sitesi

Modern, akıllı ve kullanıcı odaklı web sitesi projesi.

## Özellikler

- 🎨 Modern ve responsive tasarım
- 🤖 Luna AI asistanı (OpenAI GPT entegrasyonu)
- 📱 Mobil uyumlu
- 🔍 SEO optimizasyonu
- 📊 Dinamik içerik yönetimi
- 🏢 Kurumsal proje portföyü

## Teknolojiler

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Flask (Python)
- **Veritabanı:** SQLite
- **AI:** OpenAI API
- **Deployment:** Render + Netlify

## Kurulum

### Gereksinimler
- Python 3.11+
- OpenAI API anahtarı

### Yerel Geliştirme
```bash
# Proje dizinine gidin
cd tozyapi-backend

# Sanal ortamı aktifleştirin
source venv/bin/activate

# Bağımlılıkları yükleyin
pip install -r requirements.txt

# Ortam değişkenlerini ayarlayın
export OPENAI_API_KEY="your-api-key"
export OPENAI_API_BASE="https://api.openai.com/v1"

# Uygulamayı başlatın
python src/main.py
```

## Deployment

### Render (Backend)
1. Render hesabınızla GitHub repository'sini bağlayın
2. Web Service olarak deploy edin
3. Environment variables'ı ayarlayın:
   - `OPENAI_API_KEY`: OpenAI API anahtarınız
   - `OPENAI_API_BASE`: https://api.openai.com/v1

### Netlify (Frontend)
1. `src/static/` klasörünü ayrı bir repository'ye kopyalayın
2. Netlify hesabınızla bağlayın
3. Otomatik deploy ayarlayın

## API Endpoints

- `POST /api/luna/chat` - Luna AI sohbet
- `GET /api/luna/quick-responses` - Hızlı cevaplar
- `GET /api/luna/product-info/<type>` - Ürün bilgileri

## Lisans

Bu proje Toz Yapı Teknolojileri için özel olarak geliştirilmiştir.

## İletişim

- **Şirket:** Toz Yapı Teknolojileri
- **E-posta:** merhaba@tozyapi.com.tr
- **Telefon:** +90 536 773 14 04

