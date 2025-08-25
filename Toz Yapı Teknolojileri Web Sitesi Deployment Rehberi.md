# Toz Yapı Teknolojileri Web Sitesi Deployment Rehberi

Bu rehber, web sitenizi Render (backend) ve Netlify (frontend) üzerinde ücretsiz olarak dağıtmanız için adım adım talimatlar içermektedir.

## 🚀 Deployment Stratejisi

**Backend (Flask API):** Render.com üzerinde ücretsiz web service  
**Frontend (Statik Site):** Netlify.com üzerinde ücretsiz hosting  
**Veritabanı:** SQLite (backend ile birlikte)  
**AI Asistan:** OpenAI API entegrasyonu  

## 📋 Ön Gereksinimler

1. **GitHub Hesabı** - Kod repository'leri için
2. **Render Hesabı** - Backend deployment için (ücretsiz)
3. **Netlify Hesabı** - Frontend deployment için (ücretsiz)
4. **OpenAI API Anahtarı** - Luna AI asistanı için

## 🔧 Adım 1: GitHub Repository'leri Oluşturma

### Backend Repository
1. GitHub'da yeni bir repository oluşturun: `tozyapi-backend`
2. Local backend klasörünü GitHub'a push edin:
```bash
cd /home/ubuntu/tozyapi-backend
git remote add origin https://github.com/KULLANICI_ADINIZ/tozyapi-backend.git
git branch -M main
git push -u origin main
```

### Frontend Repository
1. GitHub'da yeni bir repository oluşturun: `tozyapi-frontend`
2. Local frontend klasörünü GitHub'a push edin:
```bash
cd /home/ubuntu/tozyapi-frontend
git remote add origin https://github.com/KULLANICI_ADINIZ/tozyapi-frontend.git
git branch -M main
git push -u origin main
```

## 🖥️ Adım 2: Backend Deployment (Render)

### 2.1 Render Hesabı Oluşturma
1. [render.com](https://render.com) adresine gidin
2. "Get Started for Free" butonuna tıklayın
3. GitHub hesabınızla giriş yapın

### 2.2 Web Service Oluşturma
1. Render dashboard'unda "New +" butonuna tıklayın
2. "Web Service" seçeneğini seçin
3. GitHub repository'nizi bağlayın (`tozyapi-backend`)
4. Aşağıdaki ayarları yapın:

**Temel Ayarlar:**
- **Name:** `tozyapi-backend`
- **Environment:** `Python 3`
- **Region:** `Frankfurt (EU Central)` (Türkiye'ye en yakın)
- **Branch:** `main`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `python src/main.py`

**Gelişmiş Ayarlar:**
- **Plan:** `Free` (0$/month)
- **Auto-Deploy:** `Yes`

### 2.3 Environment Variables Ayarlama
Render dashboard'unda "Environment" sekmesine gidin ve şu değişkenleri ekleyin:

```
OPENAI_API_KEY = your_openai_api_key_here
OPENAI_API_BASE = https://api.openai.com/v1
FLASK_ENV = production
PYTHONPATH = /opt/render/project/src
```

**Önemli:** `OPENAI_API_KEY` değerini kendi OpenAI API anahtarınızla değiştirin.

### 2.4 Deployment Başlatma
1. "Create Web Service" butonuna tıklayın
2. Deployment süreci başlayacaktır (5-10 dakika sürebilir)
3. Başarılı olduğunda size bir URL verilecektir: `https://tozyapi-backend.onrender.com`

## 🌐 Adım 3: Frontend Deployment (Netlify)

### 3.1 Netlify Hesabı Oluşturma
1. [netlify.com](https://netlify.com) adresine gidin
2. "Sign up" butonuna tıklayın
3. GitHub hesabınızla giriş yapın

### 3.2 Site Deployment
1. Netlify dashboard'unda "Add new site" butonuna tıklayın
2. "Import an existing project" seçeneğini seçin
3. GitHub'ı seçin ve `tozyapi-frontend` repository'sini seçin
4. Aşağıdaki ayarları yapın:

**Build Ayarları:**
- **Branch to deploy:** `main`
- **Build command:** (boş bırakın)
- **Publish directory:** `.` (nokta)

### 3.3 Custom Domain (Opsiyonel)
1. Site ayarlarında "Domain management" bölümüne gidin
2. "Add custom domain" butonuna tıklayın
3. `tozyapi.com.tr` domain'inizi ekleyin
4. DNS ayarlarını Netlify'ın verdiği değerlerle güncelleyin

## 🔗 Adım 4: API Bağlantısını Doğrulama

Frontend zaten backend URL'sine (`https://tozyapi-backend.onrender.com`) yönlendirilmiş durumda. Eğer backend URL'niz farklıysa:

1. Frontend repository'sindeki `js/script.js` dosyasını düzenleyin
2. API URL'lerini güncelleyin:
```javascript
const response = await fetch('https://YOUR_BACKEND_URL.onrender.com/api/luna/chat', {
```

## 🧪 Adım 5: Test ve Doğrulama

### 5.1 Backend Test
1. Backend URL'nizi tarayıcıda açın: `https://tozyapi-backend.onrender.com`
2. Ana sayfa yüklenmeli
3. API endpoint'ini test edin: `https://tozyapi-backend.onrender.com/api/luna/quick-responses`

### 5.2 Frontend Test
1. Frontend URL'nizi tarayıcıda açın: `https://YOUR_SITE_NAME.netlify.app`
2. Sayfanın tamamen yüklenmesini bekleyin
3. Luna AI asistanına tıklayın ve bir mesaj gönderin
4. Tüm bölümlerin (ürünler, projeler, iş ortakları) düzgün görüntülendiğini kontrol edin

## 🔧 Sorun Giderme

### Backend Sorunları
- **Deployment başarısız:** Build loglarını kontrol edin
- **API çalışmıyor:** Environment variables'ları kontrol edin
- **OpenAI hatası:** API anahtarının doğru olduğundan emin olun

### Frontend Sorunları
- **Luna AI çalışmıyor:** Backend URL'nin doğru olduğunu kontrol edin
- **Görseller yüklenmiyor:** Dosya yollarını kontrol edin
- **CORS hatası:** Backend'de CORS ayarlarını kontrol edin

### Genel Sorunlar
- **Yavaş yükleme:** Render'ın ücretsiz planında ilk istek yavaş olabilir
- **Uyku modu:** 15 dakika inaktivite sonrası backend uyku moduna geçer

## 📊 Performans Optimizasyonu

### Backend (Render)
- Ücretsiz planda 750 saat/ay limit
- 15 dakika inaktivite sonrası uyku modu
- İlk istekte 30 saniyeye kadar gecikme olabilir

### Frontend (Netlify)
- Sınırsız bandwidth
- Global CDN
- Otomatik SSL sertifikası
- Form handling (100 submission/ay)

## 🔄 Güncelleme Süreci

### Backend Güncelleme
1. Kod değişikliklerini GitHub'a push edin
2. Render otomatik olarak yeniden deploy edecektir

### Frontend Güncelleme
1. Kod değişikliklerini GitHub'a push edin
2. Netlify otomatik olarak yeniden deploy edecektir

## 💰 Maliyet Analizi

### Ücretsiz Limitler
- **Render:** 750 saat/ay, 512MB RAM, 0.1 CPU
- **Netlify:** 100GB bandwidth/ay, 300 build dakika/ay
- **OpenAI:** API kullanımına göre ücretlendirme

### Ücretli Upgrade Seçenekleri
- **Render Pro:** $7/ay - Uyku modu yok, daha fazla kaynak
- **Netlify Pro:** $19/ay - Daha fazla bandwidth ve özellik
- **Custom Domain:** $10-15/yıl (domain registrar'a göre)

## 📞 Destek

Deployment sırasında sorun yaşarsanız:
1. İlgili platform'un dokümantasyonunu kontrol edin
2. GitHub Issues bölümünde sorun bildirin
3. Platform destek kanallarını kullanın

## ✅ Deployment Checklist

- [ ] GitHub repository'leri oluşturuldu
- [ ] Render hesabı oluşturuldu
- [ ] Backend deploy edildi
- [ ] Environment variables ayarlandı
- [ ] Netlify hesabı oluşturuldu
- [ ] Frontend deploy edildi
- [ ] API bağlantısı test edildi
- [ ] Luna AI asistanı çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] SEO dosyaları erişilebilir
- [ ] Custom domain ayarlandı (opsiyonel)

---

**Tebrikler!** Web siteniz artık canlıda ve dünya genelinden erişilebilir durumda. 🎉

**Son URL'ler:**
- **Frontend:** `https://YOUR_SITE_NAME.netlify.app`
- **Backend API:** `https://tozyapi-backend.onrender.com`
- **Custom Domain:** `https://tozyapi.com.tr` (ayarlandıysa)

