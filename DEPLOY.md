# TSLA Stock Chart - Deploy to Vercel Guide

## 🚀 Cách Deploy lên Vercel

### Phương pháp 1: Qua Vercel CLI (Khuyến nghị)

1. **Cài đặt Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login vào Vercel**
   ```bash
   vercel login
   ```

3. **Deploy dự án**
   ```bash
   vercel
   ```
   - Chọn "Y" cho "Set up and deploy"
   - Chọn scope (account/team)
   - Nhập project name hoặc để mặc định
   - Chọn thư mục hiện tại
   - Chọn "N" cho "Want to modify settings?"

4. **Production deploy**
   ```bash
   vercel --prod
   ```

### Phương pháp 2: Qua GitHub + Vercel Dashboard

1. **Đẩy code lên GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TSLA Stock Chart"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect với Vercel**
   - Truy cập [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub
   - Click "New Project"
   - Import repository
   - Deploy

### Phương pháp 3: Drag & Drop (Đơn giản nhất)

1. **Build project**
   ```bash
   npm run build
   ```

2. **Drag & drop thư mục dist**
   - Truy cập [vercel.com](https://vercel.com)
   - Kéo thả thư mục "dist" vào trang

## ⚙️ Cấu hình

- **vercel.json** đã được tạo sẵn
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Node version**: 18.17.0

## 📱 Tính năng đã tối ưu cho Production

✅ **Responsive design** - Hoạt động tốt trên mọi thiết bị  
✅ **Performance optimized** - Fast loading  
✅ **API integration** - Real-time stock data  
✅ **Modern UI** - Glassmorphism design  
✅ **Interactive charts** - Click & hover support  

## 🌐 Sau khi Deploy

Vercel sẽ cung cấp:
- **Production URL**: `https://your-app.vercel.app`
- **Preview URLs** cho mọi commit
- **Analytics dashboard**
- **Custom domain support**

## 🔧 Troubleshooting

- Nếu gặp lỗi build: Kiểm tra Node version
- Nếu API không hoạt động: Kiểm tra CORS policy
- Nếu fonts không load: Kiểm tra font paths
