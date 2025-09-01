# TOZ Yapı API Dokümantasyonu

## Base URL
- **Production**: `https://your-domain.com`
- **Development**: `http://localhost:5000`

## Ortak Headers
```
Content-Type: application/json
```

## Endpoints

### 1. Ana Sayfa
**GET** `/`

**Açıklama**: API durumu ve sürüm bilgisi

**Response**:
```json
{
  "message": "TOZ Yapı Teknolojileri API",
  "status": "active",
  "version": "1.0.0"
}
```

### 2. Sağlık Kontrolü
**GET** `/health`

**Açıklama**: Detaylı sistem sağlık durumu

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2025-09-01T17:03:15+00:00",
  "services": {
    "openai_key": "configured",
    "openai_client": "available",
    "flask": "running"
  }
}
```

### 3. Luna Chat
**POST** `/api/luna/chat`

**Açıklama**: Luna AI asistanı ile sohbet

**Request Body**:
```json
{
  "message": "Panjur sistemleri hakkında bilgi alabilir miyim?"
}
```

**Response**:
```json
{
  "response": "Tabii ki! Panjur sistemlerimiz otomatik, manuel, monoblok ve dıştan takma olmak üzere 4 ana kategoride hizmet vermektedir...",
  "timestamp": "2025-09-01T17:03:15.123456"
}
```

**Error Response**:
```json
{
  "error": "OpenAI API anahtarı yapılandırılmamış"
}
```

### 4. Hızlı Cevaplar
**GET** `/api/luna/quick-responses`

**Açıklama**: Sık sorulan sorular için hazır cevap önerileri

**Response**:
```json
{
  "quick_responses": [
    "Panjur sistemleri hakkında bilgi almak istiyorum",
    "Pergola fiyatları nedir?",
    "Hangi şehirlerde hizmet veriyorsunuz?",
    "Montaj hizmeti veriyor musunuz?",
    "Otomatik kepenk sistemleri nasıl çalışır?",
    "Kış bahçesi için çözümleriniz neler?",
    "Proje danışmanlığı alabilir miyim?"
  ]
}
```

### 5. Ürün Bilgileri
**GET** `/api/luna/product-info/<product_type>`

**Açıklama**: Belirli ürün kategorisi hakkında detaylı bilgi

**Parametreler**:
- `product_type`: `panjur`, `kepenk`, `pergola`

**Response (örnek: panjur)**:
```json
{
  "name": "Panjur Sistemleri",
  "description": "Otomatik, manuel, monoblok ve dıştan takma panjur çeşitleri",
  "features": [
    "Güneş koruması",
    "Enerji tasarrufu",
    "Güvenlik",
    "Estetik"
  ],
  "applications": [
    "Konut",
    "Ofis",
    "Ticari mekanlar"
  ]
}
```

**Error Response (ürün bulunamadı)**:
```json
{
  "error": "Ürün bulunamadı"
}
```

## Error Codes

| Status Code | Açıklama |
|-------------|----------|
| 200 | Başarılı |
| 400 | Geçersiz istek (eksik veya hatalı parametre) |
| 404 | Endpoint veya ürün bulunamadı |
| 500 | Sunucu hatası |

## Rate Limiting

Şu anda rate limiting aktif değil, ancak production ortamında eklenmesi önerilir.

## CORS

Tüm origin'lere izin verilmektedir. Production'da belirli domain'lere kısıtlanmalıdır.

## Güvenlik

- API anahtarları environment variable olarak saklanmalıdır
- HTTPS kullanılmalıdır
- Input validation aktiftir
- Error handling ile sensitive bilgi sızıntısı önlenir

## Örnekler

### cURL Örnekleri

```bash
# Ana sayfa
curl http://localhost:5000/

# Sağlık kontrolü
curl http://localhost:5000/health

# Luna chat
curl -X POST http://localhost:5000/api/luna/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Merhaba Luna"}'

# Hızlı cevaplar
curl http://localhost:5000/api/luna/quick-responses

# Ürün bilgisi
curl http://localhost:5000/api/luna/product-info/panjur
```

### JavaScript Örnekleri

```javascript
// Luna ile sohbet
const response = await fetch('/api/luna/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: 'Pergola sistemleri hakkında bilgi alabilir miyim?'
  })
});

const data = await response.json();
console.log(data.response);

// Ürün bilgisi
const productInfo = await fetch('/api/luna/product-info/kepenk');
const product = await productInfo.json();
console.log(product);
```