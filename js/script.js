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
    initMobileMenu();
    initPerformanceOptimizations();
    initContactForm();
});

// Ürün kartlarını yükleme
function loadProductCards() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGroups.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Placeholder image with gradient based on index
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
        ];
        
        productCard.innerHTML = `
            <div class="product-image-placeholder" style="background: ${gradients[index % gradients.length]}; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; font-weight: bold;">
                ${product.title.charAt(0)}
            </div>
            <div class="product-card-content">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <button class="product-btn">Detayları Gör</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Proje carousel'ini yükleme
function loadProjectCarousel() {
    const projectCarousel = document.querySelector('.project-carousel');
    if (!projectCarousel) return;

    referenceProjects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        
        // Generate placeholder with project name
        const colors = ['#2c3e50', '#27ae60', '#e74c3c', '#3498db', '#9b59b6', '#f39c12'];
        const bgColor = colors[index % colors.length];
        
        projectItem.innerHTML = `
            <div class="project-placeholder" style="background: ${bgColor}; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">🏢</div>
                <h4 style="margin: 0; font-size: 1.2rem;">${project.name}</h4>
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
            <div style="display: flex; align-items: center; justify-content: center; height: 80px; background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 10px; font-weight: bold; color: #2c3e50; text-align: center; padding: 10px;">
                ${partner.name}
            </div>
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
        <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;">AI</div>
    `;
    document.body.appendChild(lunaToggle);

    // Luna chat penceresi oluşturma
    const lunaChat = document.createElement('div');
    lunaChat.className = 'luna-chat';
    lunaChat.innerHTML = `
        <div class="luna-header">
            <div class="luna-avatar" style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px;">AI</div>
            <div>
                <h4>Luna</h4>
                <span>AI Asistan</span>
            </div>
        </div>
        <div class="luna-body">
            <div class="luna-message">
                ${lunaMessages[0]}
            </div>
        </div>
    `;
    document.body.appendChild(lunaChat);

    // Toggle işlevselliği
    lunaToggle.addEventListener('click', function() {
        const isVisible = lunaChat.style.display === 'block';
        lunaChat.style.display = isVisible ? 'none' : 'block';
        lunaToggle.style.display = isVisible ? 'flex' : 'none';
    });

    // 3 saniye sonra Luna'yı göster
    setTimeout(() => {
        lunaChat.style.display = 'block';
        setTimeout(() => {
            lunaChat.style.display = 'none';
        }, 5000);
    }, 3000);
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

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(44, 62, 80, 0.9); display: flex; align-items: center; justify-content: center; z-index: 9999; color: white; font-size: 18px;">
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 3px solid #27ae60; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <div>Yükleniyor...</div>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });
}

// Error handling for missing images
function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6c757d;
        font-size: 14px;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
    `;
    placeholder.textContent = 'Görsel yükleniyor...';
    img.parentNode.insertBefore(placeholder, img);
}

// Add contact form functionality
function initContactForm() {
    const contactSection = document.createElement('section');
    contactSection.id = 'iletisim';
    contactSection.innerHTML = `
        <div class="container">
            <h2>İletişim</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 40px;">
                <div>
                    <h3>Bize Ulaşın</h3>
                    <form id="contact-form" style="display: flex; flex-direction: column; gap: 15px;">
                        <input type="text" placeholder="Adınız Soyadınız" required style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                        <input type="email" placeholder="E-posta Adresiniz" required style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                        <input type="tel" placeholder="Telefon Numaranız" style="padding: 12px; border: 1px solid #ddd; border-radius: 5px;">
                        <textarea placeholder="Mesajınız" rows="5" required style="padding: 12px; border: 1px solid #ddd; border-radius: 5px; resize: vertical;"></textarea>
                        <button type="submit" style="background: #27ae60; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-weight: 500;">Gönder</button>
                    </form>
                </div>
                <div>
                    <h3>İletişim Bilgileri</h3>
                    <div style="line-height: 2;">
                        <p><strong>📍 Adres:</strong><br>Üniversiteler Mah. 1597. Cad Bilkent Center AVM No:3 Bilkent Çankaya ANKARA</p>
                        <p><strong>📞 Telefon:</strong> +90 536 773 14 04</p>
                        <p><strong>📧 E-posta:</strong> merhaba@tozyapi.com.tr</p>
                        <p><strong>🕒 Çalışma Saatleri:</strong><br>Pazartesi - Cuma: 09:00 - 18:00<br>Cumartesi: 09:00 - 16:00</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    contactSection.style.cssText = 'padding: 100px 0; background: #f8f9fa;';
    document.querySelector('footer').before(contactSection);
    
    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
        this.reset();
    });
}

