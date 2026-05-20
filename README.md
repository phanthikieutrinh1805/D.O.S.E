# D.O.S.E

**D.O.S.E** là viết tắt của **Digital Opportunity for Special Education & Health**.  
Đây là một dự án web theo định hướng `social-tech`, tập trung vào:

- hỗ trợ tiếp cận số cho người khuyết tật
- giáo dục cộng đồng về sự thấu hiểu và hòa nhập
- mở ra cơ hội học tập, phát triển và kết nối
- tích hợp AI Mentor để hỗ trợ người dùng tương tác với nền tảng

## Tác giả

- **Kiều Trinh**
- GitHub: [@phanthikieutrinh1805](https://github.com/phanthikieutrinh1805)

## Dự án gồm những gì

- `index.html`: entry page, tự điều hướng vào trang Home chính
- `pages/home.html`: landing page / trang Home chính của dự án
- `pages/`: các màn hình module như `Access`, `Education`, `Opportunity`, `Humanity`, `auth`, `onboarding`, `dashboard`
- `styles.css`: style chính cho Home
- `pages/css/`: style cho các trang trong `pages/`
- `app.js`: logic frontend chính, gồm accessibility tools và chat box
- `chat_backend.py`: backend Flask cho AI Mentor
- `requirements.txt`: thư viện Python cần cài

## Công nghệ sử dụng

- HTML
- CSS
- JavaScript
- Python Flask
- OpenRouter API cho AI chat

## Cách chạy dự án

### 1. Clone repo

```bash
git clone https://github.com/phanthikieutrinh1805/D.O.S.E.git
cd D.O.S.E
```

### 2. Tạo file `.env`

Tạo file `.env` ở thư mục gốc:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Cài backend

Khuyến nghị dùng môi trường ảo:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 4. Chạy backend Flask

```bash
python3 chat_backend.py
```

Backend sẽ chạy tại:

```txt
http://localhost:5000
```

### 5. Chạy frontend

Mở thêm một terminal khác:

```bash
python3 -m http.server 5500
```

Sau đó mở trình duyệt tại:

```txt
http://127.0.0.1:5500/index.html
```

`index.html` sẽ tự chuyển vào trang Home chính.

## Lưu ý khi chạy

- Nếu chat không hoạt động, hãy kiểm tra:
  - backend Flask đã chạy chưa
  - `OPENROUTER_API_KEY` trong `.env` có đúng không
- Không nên mở trực tiếp bằng đường dẫn `file://...`
  vì một số chức năng điều hướng và API sẽ không hoạt động đúng

## Một số màn hình chính

- Home: `pages/home.html`
- Access: `pages/access.html`
- Education: `pages/education.html`
- Opportunity: `pages/opportunity.html`
- Humanity: `pages/humanity.html`
- Dashboard: `pages/dashboard.html`

## Mục tiêu của dự án

D.O.S.E không chỉ là một website hỗ trợ kỹ thuật.  
Mục tiêu của dự án là xây dựng một nền tảng công nghệ có tính nhân văn, nơi:

- người khuyết tật được tiếp cận tốt hơn
- người bình thường học cách hiểu và đồng cảm hơn
- công nghệ trở thành cầu nối cho giáo dục, cơ hội và hòa nhập

