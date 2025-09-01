#!/bin/bash

# TOZ Yapı API Backend Deployment Script
# Bu script, backend uygulamasını farklı ortamlarda deploy etmek için kullanılır

set -e

echo "🚀 TOZ Yapı API Backend Deployment Script"
echo "=========================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env exists
check_env() {
    if [ ! -f .env ]; then
        log_warn ".env dosyası bulunamadı. .env.example'dan kopyalanıyor..."
        cp .env.example .env
        log_warn "Lütfen .env dosyasını düzenleyin ve gerekli API anahtarlarını ekleyin!"
        return 1
    fi
    return 0
}

# Install dependencies
install_deps() {
    log_info "Python bağımlılıkları yükleniyor..."
    pip install -r requirements.txt
}

# Development deployment
deploy_dev() {
    log_info "Development ortamında başlatılıyor..."
    check_env || return 1
    install_deps
    export FLASK_DEBUG=True
    cd src && python main.py
}

# Production deployment
deploy_prod() {
    log_info "Production ortamında başlatılıyor..."
    check_env || return 1
    install_deps
    export FLASK_ENV=production
    export FLASK_DEBUG=False
    log_info "Gunicorn ile başlatılıyor..."
    cd src && gunicorn --bind 0.0.0.0:${PORT:-5000} --workers 4 main:app
}

# Docker deployment
deploy_docker() {
    log_info "Docker ile deploy ediliyor..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker bulunamadı. Lütfen Docker'ı yükleyin."
        exit 1
    fi
    
    log_info "Docker image build ediliyor..."
    docker build -t tozyapi-backend .
    
    log_info "Docker container başlatılıyor..."
    docker run -p 5000:5000 --env-file .env tozyapi-backend
}

# Docker Compose deployment
deploy_compose() {
    log_info "Docker Compose ile deploy ediliyor..."
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose bulunamadı. Lütfen Docker Compose'u yükleyin."
        exit 1
    fi
    
    check_env || return 1
    docker-compose up --build -d
    log_info "Uygulamanız http://localhost:5000 adresinde çalışıyor"
}

# Health check
health_check() {
    log_info "Sağlık kontrolü yapılıyor..."
    
    local url=${1:-"http://localhost:5000"}
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url/health" > /dev/null; then
            log_info "✅ Uygulama sağlıklı - $url"
            curl -s "$url/health" | python3 -m json.tool
            return 0
        fi
        
        log_warn "Attempt $attempt/$max_attempts failed. Waiting 3 seconds..."
        sleep 3
        ((attempt++))
    done
    
    log_error "❌ Sağlık kontrolü başarısız"
    return 1
}

# Test endpoints
test_endpoints() {
    local base_url=${1:-"http://localhost:5000"}
    
    log_info "API endpoint'leri test ediliyor..."
    
    echo "🔍 Ana sayfa:"
    curl -s "$base_url/" | python3 -m json.tool
    
    echo -e "\n🔍 Hızlı cevaplar:"
    curl -s "$base_url/api/luna/quick-responses" | python3 -m json.tool
    
    echo -e "\n🔍 Ürün bilgisi:"
    curl -s "$base_url/api/luna/product-info/panjur" | python3 -m json.tool
}

# Main script
case "${1:-help}" in
    "dev")
        deploy_dev
        ;;
    "prod")
        deploy_prod
        ;;
    "docker")
        deploy_docker
        ;;
    "compose")
        deploy_compose
        ;;
    "health")
        health_check "${2}"
        ;;
    "test")
        test_endpoints "${2}"
        ;;
    "help"|*)
        echo "Kullanım: $0 [COMMAND] [OPTIONS]"
        echo ""
        echo "Komutlar:"
        echo "  dev         Development ortamında başlat"
        echo "  prod        Production ortamında başlat (Gunicorn)"
        echo "  docker      Docker ile deploy et"
        echo "  compose     Docker Compose ile deploy et"
        echo "  health      Sağlık kontrolü yap"
        echo "  test        API endpoint'lerini test et"
        echo "  help        Bu yardım mesajını göster"
        echo ""
        echo "Örnekler:"
        echo "  $0 dev                              # Development başlat"
        echo "  $0 prod                             # Production başlat"
        echo "  $0 health http://localhost:5000     # Sağlık kontrolü"
        echo "  $0 test http://localhost:5000       # Endpoint testleri"
        ;;
esac