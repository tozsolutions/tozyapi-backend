# Toz Yapı Teknolojileri Web Sitesi Projesi

## Proje Özeti

Bu proje, Toz Yapı Teknolojileri için modern, akıllı ve kullanıcı odaklı bir web sitesi geliştirme sürecini kapsamaktadır. Proje, 2008 yılından beri faaliyet gösteren şirketin dijital varlığını güçlendirmek ve müşteri deneyimini artırmak amacıyla tasarlanmıştır.

## Teknik Özellikler

### Frontend Teknolojileri
- **HTML5** - Semantik yapı ve erişilebilirlik
- **CSS3** - Modern tasarım ve animasyonlar
- **JavaScript (ES6+)** - Dinamik içerik ve etkileşim
- **Responsive Design** - Mobil uyumlu tasarım

### Backend Teknolojileri
- **Flask** - Python web framework
- **SQLite** - Veritabanı yönetimi
- **OpenAI API** - Luna AI asistanı
- **Flask-CORS** - Cross-origin resource sharing

### SEO ve Optimizasyon
- **robots.txt** - Arama motoru yönergeleri
- **sitemap.xml** - Site haritası
- **llms.txt** - AI dil modelleri için özel yönergeler
- **Meta etiketler** - Arama motoru optimizasyonu

## Özellikler

### 1. Modern Web Tasarımı
- Beyaz arka plan üzerine koyu antrasit gri ve Rolex yeşili renk paleti
- Responsive tasarım ile tüm cihazlarda uyumlu görünüm
- Smooth scrolling ve hover efektleri
- Profesyonel tipografi ve düzen

### 2. Ürün Grupları
Toplam 9 ürün kategorisi:
1. Havuz Kapama Çözümleri
2. Dış Cephe Jaluzileri & Ahşap Panjur
3. Ticari Projeler & Cephe Çözümleri
4. Ticari Mekan Çözümleri
5. Giyotin & Sürme Cam Sistemleri
6. Pergola & Kış Bahçesi
7. Dış Mekân Mutfakları
8. Ticari Projeler
9. Kış Bahçesi & Tente Sistemleri

### 3. Referans Projeler
19 tamamlanmış proje:
- Metromall AVM
- TSE (Türk Standartları Enstitüsü)
- Podium AVM
- Mydonose Projesi
- Corner Design
- Pozitif ROI
- Şehr-i Polat
- Güzel Yalı
- Bülent Ecevit Üniversitesi
- Ve diğer şehir projeleri

### 4. İş Ortakları
Güvenilir marka ortaklıkları:
- Somfy (Motor Sistemleri)
- Nice (Otomasyon)
- Dorma (Kapı Sistemleri)
- Alumil (Alüminyum Profiller)
- Powerate (Güç Sistemleri)
- STR Grup
- Albert Genau
- Akseki

### 5. Luna AI Asistanı
- **Kişilik**: Nazik, yardımsever ve uzman danışman
- **Bilgi Tabanı**: Şirket ürünleri, hizmetler ve projeler
- **Özellikler**:
  - Gerçek zamanlı sohbet
  - Hızlı cevap önerileri
  - Ürün danışmanlığı
  - Proje yönlendirme
  - Sohbet geçmişi kaydetme

### 6. Blog Sistemi
- Sektörel makaleler
- Ürün incelemeleri
- Proje hikayeleri
- SEO optimizasyonu

## Dosya Yapısı

```
tozyapi-backend/
├── src/
│   ├── static/          # Frontend dosyaları
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── script.js
│   │   ├── images/
│   │   │   ├── logos/
│   │   │   ├── products/
│   │   │   └── references/
│   │   ├── pages/
│   │   │   └── blog.html
│   │   ├── index.html
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── llms.txt
│   ├── routes/          # API endpoints
│   │   ├── user.py
│   │   └── luna_ai.py
│   ├── models/          # Veritabanı modelleri
│   ├── database/        # SQLite veritabanı
│   └── main.py          # Ana Flask uygulaması
├── venv/                # Python sanal ortamı
├── requirements.txt     # Python bağımlılıkları
└── PROJE_RAPORU.md     # Bu dosya
```

## API Endpoints

### Luna AI Endpoints
- `POST /api/luna/chat` - Sohbet mesajları
- `GET /api/luna/quick-responses` - Hızlı cevap önerileri
- `GET /api/luna/product-info/<product_type>` - Ürün bilgileri

### Kullanıcı Endpoints
- `GET /api/users` - Kullanıcı listesi
- `POST /api/users` - Yeni kullanıcı oluşturma

## Kurulum ve Çalıştırma

### Gereksinimler
- Python 3.11+
- OpenAI API anahtarı
- Modern web tarayıcısı

### Kurulum Adımları
1. Proje dizinine gidin:
   ```bash
   cd tozyapi-backend
   ```

2. Sanal ortamı aktifleştirin:
   ```bash
   source venv/bin/activate
   ```

3. Bağımlılıkları yükleyin:
   ```bash
   pip install -r requirements.txt
   ```

4. Ortam değişkenlerini ayarlayın:
   ```bash
   export OPENAI_API_KEY="your-api-key"
   export OPENAI_API_BASE="https://api.openai.com/v1"
   ```

5. Uygulamayı başlatın:
   ```bash
   python src/main.py
   ```

6. Tarayıcıda açın:
   ```
   http://localhost:5001
   ```

## Deployment

### Production Hazırlığı
- Tüm bağımlılıklar `requirements.txt` dosyasında
- CORS ayarları yapılandırılmış
- Static dosyalar optimize edilmiş
- SEO dosyları hazır

### Önerilen Deployment Platformları
- **Heroku** - Kolay deployment
- **DigitalOcean** - VPS çözümü
- **AWS** - Ölçeklenebilir altyapı
- **Vercel** - Frontend odaklı

## Güvenlik

### Uygulanan Güvenlik Önlemleri
- CORS politikaları
- Input validation
- SQL injection koruması
- XSS koruması
- Rate limiting (önerilir)

## Performans

### Optimizasyon Teknikleri
- Image compression
- CSS/JS minification
- Lazy loading
- Caching strategies
- CDN kullanımı (önerilir)

## Gelecek Geliştirmeler

### Önerilen Özellikler
1. **E-ticaret Entegrasyonu**
   - Ürün kataloğu
   - Sepet sistemi
   - Ödeme entegrasyonu

2. **Çoklu Dil Desteği**
   - Türkçe, İngilizce, Rusça
   - Dinamik dil değiştirme

3. **Admin Paneli**
   - İçerik yönetimi
   - Kullanıcı yönetimi
   - Analitik raporlar

4. **Mobil Uygulama**
   - React Native
   - Push notifications
   - Offline support

5. **Gelişmiş Analytics**
   - Google Analytics
   - Heatmap tracking
   - Conversion tracking

## İletişim Bilgileri

**Şirket**: Toz Yapı Teknolojileri  
**Adres**: Üniversiteler Mah. 1597. Cad Bilkent Center AVM No:3 Bilkent Çankaya ANKARA  
**Telefon**: +90 536 773 14 04  
**E-posta**: merhaba@tozyapi.com.tr  
**Web**: www.tozyapi.com.tr  

## Proje Tamamlanma Tarihi
18 Temmuz 2025

---

*Bu proje, modern web teknolojileri kullanılarak geliştirilmiş olup, sürekli güncelleme ve geliştirme için tasarlanmıştır.*

