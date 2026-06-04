# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
