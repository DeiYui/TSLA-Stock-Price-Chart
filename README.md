# Ứng Dụng Biểu Đồ Cổ Phiếu TSLA
<img width="1843" height="862" alt="image" src="https://github.com/user-attachments/assets/833e1e72-793f-4bec-8662-3929eb581b90" />

Ứng dụng React được xây dựng bằng Vite để hiển thị biểu đồ giá cổ phiếu Tesla (TSLA) với nhiều khung thời gian khác nhau.

## Tính Năng

- **Nút Chọn Khung Thời Gian**: Chuyển đổi giữa các chế độ xem theo giờ, ngày, tuần và tháng
- **Dữ Liệu Cổ Phiếu Thời Gian Thực**: Lấy dữ liệu cổ phiếu TSLA trực tiếp từ API chart.stockscan.io
- **Biểu Đồ Đường Tương Tác**: Được xây dựng với thư viện Recharts để hiển thị mượt mà
- **Xử Lý Lỗi**: Xử lý lỗi phù hợp khi API gặp sự cố
- **Thiết Kế Responsive**: Hoạt động tốt trên cả máy tính và điện thoại

## Công Nghệ Sử Dụng

- **React 18** - Framework frontend
- **Vite** - Công cụ build và dev server
- **Recharts** - Thư viện hiển thị biểu đồ
- **Axios** - HTTP client để gọi API
- **CSS3** - Styling với thiết kế responsive

## Tích Hợp API

Sử dụng endpoint API sau để lấy dữ liệu cổ phiếu:
```
https://chart.stockscan.io/candle/v3/TSLA/{timeFrame}/NASDAQ
```

Trong đó `timeFrame` có thể là: `hourly`, `daily`, `weekly`, hoặc `monthly`

## Hướng Dẫn Bắt Đầu

### Yêu Cầu Hệ Thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài Đặt

1. Clone repository
2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Khởi động development server:
   ```bash
   npm run dev
   ```

4. Mở trình duyệt và truy cập `http://localhost:5173`

## Các Lệnh Có Sẵn

- `npm run dev` - Khởi động development server
- `npm run build` - Build cho production
- `npm run preview` - Xem preview bản build production
- `npm run lint` - Chạy ESLint

## Cấu Trúc Dự Án

```
src/
├── App.jsx          # Component chính của ứng dụng
├── App.css          # Style cho ứng dụng
└── main.jsx         # Entry point của ứng dụng
```

## Định Dạng Dữ Liệu

Ứng dụng sử dụng các trường dữ liệu sau từ API:
- `close` - Giá đóng cửa của cổ phiếu
- `date` - Timestamp cho điểm dữ liệu

## Cách Sử Dụng

1. **Chọn Khung Thời Gian**: Click vào các nút Hourly, Daily, Weekly, Monthly để xem dữ liệu theo khung thời gian tương ứng
2. **Xem Biểu Đồ**: Biểu đồ sẽ tự động cập nhật với dữ liệu mới
3. **Hover Tooltip**: Di chuột lên biểu đồ để xem thông tin chi tiết tại từng điểm

## Lưu Ý

- Dữ liệu được lấy từ API bên thứ 3, có thể có độ trễ hoặc giới hạn số lần truy cập
- Ứng dụng hoạt động tốt nhất trên các trình duyệt hiện đại
- Đảm bảo kết nối internet ổn định để lấy dữ liệu API
