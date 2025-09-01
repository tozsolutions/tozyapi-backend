#!/bin/bash

# TOZ Yapı API Backend Monitoring Script
# Bu script, API'nin sağlık durumunu ve performansını izler

set -e

# Configuration
BASE_URL=${1:-"http://localhost:5000"}
LOG_FILE="monitoring.log"
CHECK_INTERVAL=60  # seconds

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

log_warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

log_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

# Health check function
check_health() {
    local response_time
    local status_code
    
    # Measure response time and get status code
    response_time=$(curl -o /dev/null -s -w '%{time_total}' -m 10 "$BASE_URL/health")
    status_code=$(curl -o /dev/null -s -w '%{http_code}' -m 10 "$BASE_URL/health")
    
    if [ "$status_code" = "200" ]; then
        if (( $(echo "$response_time > 2.0" | bc -l) )); then
            log_warn "⚠️  API yanıt süresi yavaş: ${response_time}s"
        else
            log_info "✅ API sağlıklı - Response time: ${response_time}s"
        fi
        return 0
    else
        log_error "❌ API sağlık kontrolü başarısız - HTTP $status_code"
        return 1
    fi
}

# Test critical endpoints
test_endpoints() {
    local failed=0
    
    # Test home endpoint
    if ! curl -f -s "$BASE_URL/" > /dev/null; then
        log_error "❌ Ana endpoint başarısız: /"
        ((failed++))
    fi
    
    # Test Luna quick responses
    if ! curl -f -s "$BASE_URL/api/luna/quick-responses" > /dev/null; then
        log_error "❌ Luna quick responses başarısız"
        ((failed++))
    fi
    
    # Test product info
    if ! curl -f -s "$BASE_URL/api/luna/product-info/panjur" > /dev/null; then
        log_error "❌ Ürün bilgisi endpoint başarısız"
        ((failed++))
    fi
    
    if [ $failed -eq 0 ]; then
        log_info "✅ Tüm endpoint'ler çalışıyor"
    else
        log_error "❌ $failed endpoint başarısız"
    fi
    
    return $failed
}

# Monitor memory and CPU (if available)
check_resources() {
    if command -v ps &> /dev/null; then
        local pid=$(pgrep -f "python.*main.py\|gunicorn.*main:app" | head -1)
        if [ -n "$pid" ]; then
            local cpu_mem=$(ps -p $pid -o %cpu,%mem --no-headers 2>/dev/null || echo "N/A N/A")
            log_info "📊 Kaynak kullanımı - CPU: $(echo $cpu_mem | awk '{print $1}')%, MEM: $(echo $cpu_mem | awk '{print $2}')%"
        fi
    fi
}

# Send notification (basic implementation)
send_alert() {
    local message="$1"
    log_error "🚨 ALERT: $message"
    
    # Here you could add integration with:
    # - Slack webhook
    # - Discord webhook
    # - Email notification
    # - SMS service
    # Example: curl -X POST $SLACK_WEBHOOK -d "{'text':'$message'}"
}

# Single check mode
single_check() {
    log_info "🔍 Tek seferlik kontrol başlatılıyor..."
    log_info "📍 URL: $BASE_URL"
    
    if check_health; then
        test_endpoints
        check_resources
        log_info "✅ Kontrol tamamlandı"
    else
        send_alert "API sağlık kontrolü başarısız: $BASE_URL"
        exit 1
    fi
}

# Continuous monitoring mode
continuous_monitor() {
    log_info "🔄 Sürekli izleme başlatılıyor..."
    log_info "📍 URL: $BASE_URL"
    log_info "⏱️  Kontrol aralığı: ${CHECK_INTERVAL}s"
    log_info "📄 Log dosyası: $LOG_FILE"
    
    local consecutive_failures=0
    local max_failures=3
    
    while true; do
        if check_health; then
            consecutive_failures=0
            
            # Every 10 minutes, do a full endpoint test
            if [ $(($(date +%s) % 600)) -lt $CHECK_INTERVAL ]; then
                test_endpoints
                check_resources
            fi
        else
            ((consecutive_failures++))
            
            if [ $consecutive_failures -ge $max_failures ]; then
                send_alert "API $max_failures defa art arda başarısız oldu: $BASE_URL"
                consecutive_failures=0  # Reset to avoid spam
            fi
        fi
        
        sleep $CHECK_INTERVAL
    done
}

# Usage information
show_usage() {
    echo "TOZ Yapı API Monitoring Script"
    echo "Kullanım: $0 [URL] [MODE]"
    echo ""
    echo "Parametreler:"
    echo "  URL     API base URL (varsayılan: http://localhost:5000)"
    echo "  MODE    Monitoring modu:"
    echo "          check  - Tek seferlik kontrol (varsayılan)"
    echo "          watch  - Sürekli izleme"
    echo ""
    echo "Örnekler:"
    echo "  $0                                    # Localhost tek kontrol"
    echo "  $0 https://api.tozyapi.com check     # Production tek kontrol"
    echo "  $0 https://api.tozyapi.com watch     # Production sürekli izleme"
}

# Main script
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_usage
    exit 0
fi

# Set URL if provided
if [ -n "$1" ] && [[ "$1" =~ ^https?:// ]]; then
    BASE_URL="$1"
    shift
fi

# Set mode
MODE=${1:-"check"}

case "$MODE" in
    "check")
        single_check
        ;;
    "watch")
        continuous_monitor
        ;;
    *)
        echo "Geçersiz mod: $MODE"
        show_usage
        exit 1
        ;;
esac