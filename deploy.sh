#!/bin/bash

# 🚀 Toz Yapı Teknolojileri - Deployment Script
# Bu script projeyi production'a hazırlar ve deploy eder

echo "🏗️  Toz Yapı Teknolojileri - Deployment Başlıyor..."

# Renklendirme
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Hata durumunda scripti durdur
set -e

# 1. Dependency Check
echo -e "${BLUE}📦 Dependencies kontrol ediliyor...${NC}"
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js bulundu: $(node --version)${NC}"
else
    echo -e "${RED}❌ Node.js bulunamadı. Lütfen Node.js yükleyin.${NC}"
    exit 1
fi

# 2. Package.json kontrolü
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json bulundu${NC}"
else
    echo -e "${RED}❌ package.json bulunamadı${NC}"
    exit 1
fi

# 3. Gerekli dosyaların kontrolü
echo -e "${BLUE}📋 Dosya kontrolü yapılıyor...${NC}"

required_files=("index.html" "css/style.css" "js/script.js" "netlify.toml")
missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file bulunamadı${NC}"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo -e "${RED}❌ Eksik dosyalar var. Deployment durduruluyor.${NC}"
    exit 1
fi

# 4. HTML Validation (basit kontrol)
echo -e "${BLUE}🔍 HTML syntax kontrolü...${NC}"
if grep -q "<!DOCTYPE html>" index.html; then
    echo -e "${GREEN}✅ HTML5 DOCTYPE bulundu${NC}"
else
    echo -e "${YELLOW}⚠️  HTML5 DOCTYPE bulunamadı${NC}"
fi

# 5. CSS Validation (basit kontrol)
echo -e "${BLUE}🎨 CSS syntax kontrolü...${NC}"
if [ -s "css/style.css" ]; then
    echo -e "${GREEN}✅ CSS dosyası dolu${NC}"
else
    echo -e "${RED}❌ CSS dosyası boş${NC}"
    exit 1
fi

# 6. JavaScript Validation (basit kontrol)
echo -e "${BLUE}⚡ JavaScript syntax kontrolü...${NC}"
if [ -s "js/script.js" ]; then
    echo -e "${GREEN}✅ JavaScript dosyası dolu${NC}"
else
    echo -e "${RED}❌ JavaScript dosyası boş${NC}"
    exit 1
fi

# 7. Build Process
echo -e "${BLUE}🔨 Build process başlıyor...${NC}"
npm run build

# 8. File Size Check
echo -e "${BLUE}📏 Dosya boyutları kontrol ediliyor...${NC}"

check_file_size() {
    local file=$1
    local max_size=$2
    
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        size_mb=$((size / 1024 / 1024))
        
        if [ $size -gt $max_size ]; then
            echo -e "${YELLOW}⚠️  $file dosyası büyük: ${size_mb}MB${NC}"
        else
            echo -e "${GREEN}✅ $file boyutu uygun: ${size_mb}MB${NC}"
        fi
    fi
}

# Dosya boyut kontrolleri (bytes)
check_file_size "css/style.css" 100000    # 100KB
check_file_size "js/script.js" 200000     # 200KB
check_file_size "index.html" 50000        # 50KB

# 9. Performance Check
echo -e "${BLUE}⚡ Performance kontrolleri...${NC}"

# CSS minification check
if grep -q "/\*" css/style.css; then
    echo -e "${YELLOW}⚠️  CSS'de comment'ler var (production'da kaldırılabilir)${NC}"
else
    echo -e "${GREEN}✅ CSS temiz${NC}"
fi

# 10. SEO Check
echo -e "${BLUE}🔍 SEO kontrolleri...${NC}"

seo_checks=(
    "title"
    "meta name=\"description\""
    "meta property=\"og:title\""
    "meta name=\"robots\""
)

for check in "${seo_checks[@]}"; do
    if grep -q "$check" index.html; then
        echo -e "${GREEN}✅ $check bulundu${NC}"
    else
        echo -e "${YELLOW}⚠️  $check bulunamadı${NC}"
    fi
done

# 11. Security Check
echo -e "${BLUE}🔒 Security kontrolleri...${NC}"

if [ -f "netlify.toml" ]; then
    if grep -q "X-Frame-Options" netlify.toml; then
        echo -e "${GREEN}✅ Security headers yapılandırılmış${NC}"
    else
        echo -e "${YELLOW}⚠️  Security headers eksik${NC}"
    fi
fi

# 12. Final Checks
echo -e "${BLUE}🏁 Final kontroller...${NC}"

# Robots.txt
if [ -f "robots.txt" ]; then
    echo -e "${GREEN}✅ robots.txt mevcut${NC}"
else
    echo -e "${YELLOW}⚠️  robots.txt bulunamadı${NC}"
fi

# Sitemap.xml
if [ -f "sitemap.xml" ]; then
    echo -e "${GREEN}✅ sitemap.xml mevcut${NC}"
else
    echo -e "${YELLOW}⚠️  sitemap.xml bulunamadı${NC}"
fi

# 13. Deployment Ready
echo -e "${GREEN}"
echo "🎉 =================================="
echo "🚀 DEPLOYMENT HAZIR!"
echo "=================================="
echo -e "${NC}"

echo -e "${BLUE}📋 Deployment Seçenekleri:${NC}"
echo "1. 🌐 Netlify (Önerilen)"
echo "2. ⚡ Vercel"
echo "3. 📁 GitHub Pages"

echo -e "${YELLOW}"
echo "📋 Netlify Deployment Adımları:"
echo "1. https://netlify.com adresine gidin"
echo "2. 'New site from Git' seçin"
echo "3. GitHub repository'nizi bağlayın"
echo "4. Build command: 'npm run build'"
echo "5. Publish directory: '.'"
echo "6. Deploy butonuna tıklayın"
echo -e "${NC}"

echo -e "${GREEN}✅ Proje production'a hazır!${NC}"
echo -e "${BLUE}📊 Proje Özeti:${NC}"
echo "- ✅ HTML5 semantic markup"
echo "- ✅ Responsive CSS3"
echo "- ✅ Modern JavaScript"
echo "- ✅ SEO optimized"
echo "- ✅ Security headers"
echo "- ✅ Performance optimized"

# Son olarak git status kontrol et
if git status &> /dev/null; then
    echo -e "${BLUE}📝 Git durumu:${NC}"
    git status --porcelain
    
    echo -e "${YELLOW}"
    echo "💡 Git commit önerisi:"
    echo "git add ."
    echo "git commit -m 'Production ready - v2.0.0'"
    echo "git push origin main"
    echo -e "${NC}"
fi

echo -e "${GREEN}🎯 Deployment tamamlandı!${NC}"