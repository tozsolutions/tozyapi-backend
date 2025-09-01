// Luna AI Chat Configuration
const LUNA_API_BASE = window.location.protocol + '//' + window.location.host;

// Luna AI Chat Module
class LunaChat {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.initialize();
    }

    initialize() {
        this.createChatInterface();
        this.loadQuickResponses();
    }

    createChatInterface() {
        // Create chat button
        const chatButton = document.createElement('div');
        chatButton.className = 'luna-chat-button';
        chatButton.innerHTML = '💬';
        chatButton.title = 'Luna AI Asistan';
        chatButton.onclick = () => this.toggleChat();
        
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.className = 'luna-chat-container';
        chatContainer.style.display = 'none';
        chatContainer.innerHTML = `
            <div class="luna-chat-header">
                <h3>Luna AI Asistan</h3>
                <button onclick="lunaChat.toggleChat()" class="luna-close-btn">&times;</button>
            </div>
            <div class="luna-chat-messages" id="luna-messages"></div>
            <div class="luna-quick-responses" id="luna-quick-responses"></div>
            <div class="luna-chat-input">
                <input type="text" id="luna-input" placeholder="Mesajınızı yazın..." maxlength="1000">
                <button onclick="lunaChat.sendMessage()" id="luna-send-btn">Gönder</button>
            </div>
        `;

        document.body.appendChild(chatButton);
        document.body.appendChild(chatContainer);

        // Add enter key support
        document.getElementById('luna-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const container = document.querySelector('.luna-chat-container');
        this.isOpen = !this.isOpen;
        container.style.display = this.isOpen ? 'block' : 'none';
        
        if (this.isOpen && this.messages.length === 0) {
            this.addMessage('Luna', 'Merhaba! Ben Luna, Toz Yapı Teknolojileri AI asistanıyım. Size nasıl yardımcı olabilirim?', 'luna');
        }
    }

    async loadQuickResponses() {
        try {
            const response = await fetch(`${LUNA_API_BASE}/api/luna/quick-responses`);
            if (response.ok) {
                const data = await response.json();
                this.displayQuickResponses(data.quick_responses);
            }
        } catch (error) {
            console.log('Quick responses could not be loaded:', error);
        }
    }

    displayQuickResponses(responses) {
        const container = document.getElementById('luna-quick-responses');
        container.innerHTML = responses.map(response => 
            `<button class="luna-quick-btn" onclick="lunaChat.sendQuickMessage('${response}')">${response}</button>`
        ).join('');
    }

    sendQuickMessage(message) {
        document.getElementById('luna-input').value = message;
        this.sendMessage();
    }

    async sendMessage() {
        const input = document.getElementById('luna-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage('Siz', message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch(`${LUNA_API_BASE}/api/luna/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            
            this.hideTypingIndicator();

            if (response.ok) {
                this.addMessage('Luna', data.response, 'luna');
            } else {
                this.addMessage('Luna', `Üzgünüm, bir hata oluştu: ${data.error || 'Bilinmeyen hata'}`, 'luna error');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Luna', 'Bağlantı hatası. Lütfen daha sonra tekrar deneyin.', 'luna error');
        }
    }

    addMessage(sender, text, type) {
        const messagesContainer = document.getElementById('luna-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `luna-message ${type}`;
        messageDiv.innerHTML = `
            <div class="luna-message-sender">${sender}</div>
            <div class="luna-message-text">${text}</div>
            <div class="luna-message-time">${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, text, type, timestamp: new Date() });
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'luna-typing-indicator';
        indicator.id = 'luna-typing';
        indicator.innerHTML = `
            <div class="luna-message luna">
                <div class="luna-message-sender">Luna</div>
                <div class="luna-message-text">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('luna-messages').appendChild(indicator);
        document.getElementById('luna-messages').scrollTop = document.getElementById('luna-messages').scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('luna-typing');
        if (indicator) {
            indicator.remove();
        }
    }
}

// Initialize Luna Chat when page loads
let lunaChat;
document.addEventListener('DOMContentLoaded', () => {
    lunaChat = new LunaChat();
});

// Existing product functionality
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
    }
];

// Initialize website functionality
document.addEventListener('DOMContentLoaded', function() {
    loadProductGroups();
    setupSmoothScrolling();
});

function loadProductGroups() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = productGroups.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" onerror="this.src='images/placeholder.jpg'">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <button class="product-btn" onclick="lunaChat.sendQuickMessage('${product.title} hakkında bilgi almak istiyorum')">Detay Al</button>
        </div>
    `).join('');
}

function setupSmoothScrolling() {
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