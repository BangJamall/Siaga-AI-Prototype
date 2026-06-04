# Fraud Detection System

Fraud Detection System adalah aplikasi yang dirancang untuk membantu pengguna mengidentifikasi apakah suatu pesan berpotensi mengandung unsur penipuan (fraud) atau tidak. Sistem ini menggunakan pendekatan **scoring-based detection** dengan menggabungkan tiga fitur utama untuk menghasilkan tingkat risiko yang lebih akurat:

* **Natural Language Processing (NLP)** untuk menganalisis isi dan pola bahasa pada pesan.
* **Link Analysis** untuk memeriksa keamanan tautan yang terdapat dalam pesan menggunakan Google Safe Browsing API.
* **Sender Number Verification** untuk melakukan validasi dan analisis nomor pengirim menggunakan NumVerify API.

Setiap fitur akan memberikan skor tertentu yang kemudian dikombinasikan untuk menghasilkan **fraud score** sebagai indikator tingkat risiko penipuan pada pesan yang dianalisis.

## Technology Stack

### Frontend

Frontend dikembangkan menggunakan:

* React
* Vite

### Backend

Backend dibangun menggunakan:

* Python
* FastAPI

### External Services

* Google Safe Browsing API (Deteksi dan validasi keamanan URL)
* NumVerify API (Validasi dan informasi nomor telepon)

## Future Development

Sebagai pengembangan lanjutan, sistem ini akan dilengkapi dengan **chatbot integration** sehingga pengguna tidak perlu mengakses aplikasi secara langsung. Pengguna cukup mengirimkan pesan yang ingin diperiksa kepada chatbot, dan sistem akan secara otomatis melakukan analisis serta memberikan hasil deteksi beserta tingkat risiko penipuannya.

## Objective

Tujuan utama proyek ini adalah membantu masyarakat mengenali dan menghindari berbagai bentuk penipuan digital, seperti phishing, scam, dan social engineering, melalui analisis otomatis yang cepat, mudah digunakan, dan dapat diakses oleh siapa saja.
