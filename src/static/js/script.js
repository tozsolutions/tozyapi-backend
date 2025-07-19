// Toz Yapı Teknolojileri Web Sitesi JavaScript

// Ürün Grupları Verisi
const productGroups = [
    {
        title: "Havuz Kapama Çözümleri",
        image: "images/products/URUNGRUPLARI(1).jpg",
        description: "Modern havuz kapama sistemleri ile güvenlik ve estetik bir arada."
    },
    {
        title: "Dış Cephe Jaluzileri & Ahşap Panjur",
        image: "images/products/URUNGRUPLARI(2).jpg",
        description: "Mimari çözümler için ahşap panjur ve dış cephe jaluzileri."
    },
    {
        title: "Ticari Projeler & Cephe Çözümleri",
        image: "images/products/URUNGRUPLARI(3).jpg",
        description: "Büyük ölçekli projeler için profesyonel cephe sistemleri."
    },
    {
        title: "Ticari Mekan Çözümleri",
        image: "images/products/URUNGRUPLARI(4).jpg",
        description: "Kafe, restoran ve ticari mekanlar için özel tasarım çözümleri."
    },
    {
        title: "Giyotin & Sürme Cam Sistemleri",
        image: "images/products/URUNGRUPLARI(5).jpg",
        description: "Akıllı cam uygulamaları ve giyotin sistemleri."
    },
    {
        title: "Pergola & Kış Bahçesi",
        image: "images/products/URUNGRUPLARI(6).jpg",
        description: "Pergola sistemleri ve kış bahçesi çözümleri."
    },
    {
        title: "Dış Mekân Mutfakları",
        image: "images/products/URUNGRUPLARI(7).jpg",
        description: "Bioclimatic pergola ile dış mekan mutfak çözümleri."
    },
    {
        title: "Ticari Projeler",
        image: "images/products/URUNGRUPLARI(8).jpg",
        description: "Ticari mekanlar için kapsamlı çözümler."
    },
    {
        title: "Kış Bahçesi & Tente Sistemleri",
        image: "images/products/URUNGRUPLARI(9).jpg",
        description: "Geniş alanlar için kış bahçesi ve tente çözümleri."
    }
];

// Referans Projeler Verisi
const referenceProjects = [
    { name: "Metromall AVM", image: "images/references/REFERASLAR(1).jpg" },
    { name: "Mydonose Projesi", image: "images/references/REFERASLAR(2).jpg" },
    { name: "Şehr-i Polat", image: "images/references/REFERASLAR(3).jpg" },
    { name: "Corner Design", image: "images/references/REFERASLAR(4).jpg" },
    { name: "Mülayimler Projesi", image: "images/references/REFERASLAR(5).jpg" },
    { name: "Pozitif ROI", image: "images/references/REFERASLAR(6).jpg" },
    { name: "Podium AVM", image: "images/references/REFERASLAR(7).jpg" },
    { name: "Kocatepe Projesi", image: "images/references/REFERASLAR(8).jpg" },
    { name: "Çubuk Projesi", image: "images/references/REFERASLAR(9).jpg" },
    { name: "TSE Projesi", image: "images/references/REFERASLAR(10).jpg" },
    { name: "Güzel Yalı", image: "images/references/REFERASLAR(11).jpg" },
    { name: "Sincan Projesi", image: "images/references/REFERASLAR(12).jpg" },
    { name: "Ankara Projesi", image: "images/references/REFERASLAR(13).jpg" },
    { name: "Kayseri Projesi", image: "images/references/REFERASLAR(14).jpg" },
    { name: "Konya Projesi", image: "images/references/REFERASLAR(15).jpg" },
    { name: "İzmir Projesi", image: "images/references/REFERASLAR(16).jpg" },
    { name: "Antalya Projesi", image: "images/references/REFERASLAR(17).jpg" },
    { name: "Adana Projesi", image: "images/references/REFERASLAR(18).jpg" },
    { name: "Mersin Projesi", image: "images/references/REFERASLAR(19).jpg" }
];

// İş Ortakları Verisi
const partners = [
    { name: "Akseki", logo: "images/logos/akseki_yap_logo.jpeg" },
    { name: "Albert Genau", logo: "images/logos/Albert-Genau-Logo-Vector.svg-.png" },
    { name: "Alumil", logo: "images/logos/Alumil_logo.jpg" },
    { name: "Dorma", logo: "images/logos/imgbin-logo-dorma-brand-product-design-united-kingdom-united-kingdom-3tQLJh20kMpWyCk2F7wzG27KM.jpg" },
    { name: "Nice", logo: "images/logos/Nice-spa-logo.png" },
    { name: "Powerate", logo: "images/logos/retina-powerate-logo.png" },
    { name: "Somfy", logo: "images/logos/somfy-logo-png_seeklogo-296260.png" },
    { name: "STR Grup", logo: "images/logos/1__440_577f61c1-str_grup.png" },
    { name: "Facebook", logo: "images/logos/FacebooklogoR@H(1).png" }
];

// Luna AI Mesajları
const lunaMessages = [
    "Merhaba, Toz Yapı Teknolojileri'ne hoş geldiniz. Size bugün nasıl yardımcı olabilirim?",
    "Hangi ürün grubu hakkında bilgi almak istiyorsunuz?",
    "Projelerimizi incelemek ister misiniz?",
    "Size özel bir teklif hazırlayabilirim. Ne tür bir çözüm arıyorsunuz?"
];

// DOM Yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    loadProductCards();
    loadProjectCarousel();
    loadPartnerCarousel();
    initLunaAI();
    initSmoothScrolling();
});

// Ürün kartlarını yükleme
function loadProductCards() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGroups.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-card-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Proje carousel'ini yükleme
function loadProjectCarousel() {
    const projectCarousel = document.querySelector('.project-carousel');
    if (!projectCarousel) return;

    referenceProjects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="project-overlay">
                <h4>${project.name}</h4>
            </div>
        `;
        projectCarousel.appendChild(projectItem);
    });
}

// İş ortakları carousel'ini yükleme
function loadPartnerCarousel() {
    const partnerCarousel = document.querySelector('.partner-carousel');
    if (!partnerCarousel) return;

    partners.forEach(partner => {
        const partnerItem = document.createElement('div');
        partnerItem.className = 'partner-item';
        partnerItem.innerHTML = `
            <img src="${partner.logo}" alt="${partner.name}">
        `;
        partnerCarousel.appendChild(partnerItem);
    });
}

// Luna AI Asistanını başlatma
function initLunaAI() {
    // Luna toggle butonu oluşturma
    const lunaToggle = document.createElement('div');
    lunaToggle.className = 'luna-toggle';
    lunaToggle.innerHTML = `
        <img src="images/logos/LunaAI.jpg" alt="Luna AI">
    `;
    document.body.appendChild(lunaToggle);

    // Luna chat penceresi oluşturma
    const lunaChat = document.createElement('div');
    lunaChat.className = 'luna-chat';
    lunaChat.innerHTML = `
        <div class="luna-header">
            <img src="images/logos/LunaAI.jpg" alt="Luna" class="luna-avatar">
            <div>
                <h4>Luna</h4>
                <span>AI Asistan</span>
            </div>
            <button class="luna-close">&times;</button>
        </div>
        <div class="luna-body" id="luna-messages">
            <div class="luna-message luna-message-bot">
                Merhaba, Toz Yapı Teknolojileri'ne hoş geldiniz. Size bugün nasıl yardımcı olabilirim?
            </div>
        </div>
        <div class="luna-input-area">
            <input type="text" id="luna-input" placeholder="Mesajınızı yazın..." maxlength="500">
            <button id="luna-send">Gönder</button>
        </div>
        <div class="luna-quick-responses" id="luna-quick-responses">
            <!-- Hızlı cevaplar buraya gelecek -->
        </div>
    `;
    document.body.appendChild(lunaChat);

    // Event listeners
    lunaToggle.addEventListener('click', function() {
        lunaChat.style.display = 'block';
        lunaToggle.style.display = 'none';
        loadQuickResponses();
    });

    const lunaClose = lunaChat.querySelector('.luna-close');
    lunaClose.addEventListener('click', function() {
        lunaChat.style.display = 'none';
        lunaToggle.style.display = 'flex';
    });

    const lunaInput = document.getElementById('luna-input');
    const lunaSend = document.getElementById('luna-send');

    lunaSend.addEventListener('click', sendMessage);
    lunaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 3 saniye sonra Luna'yı göster
    setTimeout(() => {
        lunaChat.style.display = 'block';
        setTimeout(() => {
            lunaChat.style.display = 'none';
        }, 5000);
    }, 3000);
}

// Mesaj gönderme fonksiyonu
async function sendMessage() {
    const input = document.getElementById('luna-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Kullanıcı mesajını ekle
    addMessage(message, 'user');
    input.value = '';

    // Yükleniyor mesajı
    const loadingId = addMessage('Yazıyor...', 'bot', true);

    try {
        const response = await fetch('/api/luna/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // Yükleniyor mesajını kaldır
        removeMessage(loadingId);
        
        if (data.response) {
            addMessage(data.response, 'bot');
        } else {
            addMessage('Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 'bot');
        }
    } catch (error) {
        removeMessage(loadingId);
        addMessage('Bağlantı hatası. Lütfen daha sonra tekrar deneyin.', 'bot');
    }
}

// Mesaj ekleme fonksiyonu
function addMessage(text, sender, isLoading = false) {
    const messagesContainer = document.getElementById('luna-messages');
    const messageDiv = document.createElement('div');
    const messageId = 'msg-' + Date.now();
    
    messageDiv.id = messageId;
    messageDiv.className = `luna-message luna-message-${sender}`;
    if (isLoading) messageDiv.classList.add('loading');
    
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageId;
}

// Mesaj kaldırma fonksiyonu
function removeMessage(messageId) {
    const message = document.getElementById(messageId);
    if (message) {
        message.remove();
    }
}

// Hızlı cevapları yükleme
async function loadQuickResponses() {
    try {
        const response = await fetch('/api/luna/quick-responses');
        const data = await response.json();
        
        const quickResponsesContainer = document.getElementById('luna-quick-responses');
        quickResponsesContainer.innerHTML = '';
        
        data.quick_responses.forEach(responseText => {
            const button = document.createElement('button');
            button.className = 'quick-response-btn';
            button.textContent = responseText;
            button.addEventListener('click', () => {
                document.getElementById('luna-input').value = responseText;
                sendMessage();
            });
            quickResponsesContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Hızlı cevaplar yüklenemedi:', error);
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Carousel otomatik kaydırma
function startCarouselAutoScroll() {
    const carousels = document.querySelectorAll('.project-carousel, .partner-carousel');
    
    carousels.forEach(carousel => {
        let scrollAmount = 0;
        const scrollStep = 2;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        setInterval(() => {
            if (scrollAmount >= maxScroll) {
                scrollAmount = 0;
            } else {
                scrollAmount += scrollStep;
            }
            carousel.scrollLeft = scrollAmount;
        }, 50);
    });
}

// Sayfa yüklendikten sonra carousel'i başlat
window.addEventListener('load', () => {
    setTimeout(startCarouselAutoScroll, 2000);
});

