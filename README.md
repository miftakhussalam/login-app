# 🚀 Panduan Instalasi dan Menjalankan Proyek

Panduan ini berisi langkah-langkah yang diperlukan untuk menginstal dependensi, menyiapkan konfigurasi lingkungan, dan melakukan seeding database agar proyek ini siap dijalankan di lingkungan lokal Anda.

# 🛠️ Prasyarat

Pastikan Anda telah menginstal Node.js dan salah satu dari manajer paket berikut (Yarn, npm, atau Bun).

# ⚙️ Langkah-Langkah Instalasi

Ikuti langkah-langkah instalasi ini secara berurutan.

# 1. Instalasi Dependensi Global

Jalankan perintah berikut untuk menginstal alat yang diperlukan secara global melalui npm:
```
> npm install -g sequelize-cli
> npm install -g nodemon
```

# 2. Instalasi Dependensi Server

Masuk ke direktori server dan instal semua dependensi yang diperlukan.
```
> cd server
### Pilih salah satu perintah berikut:
> yarn install
### ATAU
> npm install
### ATAU
> bun install
```

# 3. Instalasi Dependensi Klien (Client)

Masuk ke direktori client dan instal semua dependensi yang diperlukan.
```
> cd client

### Pilih salah satu perintah berikut:
> yarn install
### ATAU
> npm install
### ATAU
> bun install
```

# 📝 Konfigurasi Variabel Lingkungan (.env)

Proyek ini memerlukan file konfigurasi variabel lingkungan (.env) di kedua direktori (server dan client).

Buat file .env di dalam folder client:

## Di dalam folder client
```
> cp .env.example .env
```

Edit file client/.env dan sesuaikan nilai variabelnya sesuai dengan kebutuhan proyek.

Buat file .env di dalam folder server:

## Di dalam folder server
```
> cp .env.example .env
```

Edit file server/.env dan sesuaikan nilai variabelnya, terutama konfigurasi database.

# 🌱 Seeding Database

Setelah semua dependensi dan konfigurasi environment selesai, jalankan proses seeding (pengisian data awal) database.

Pastikan Anda berada di root directory proyek sebelum menjalankan perintah ini:

# Pastikan Anda berada di direktori akar proyek
```
> yarn seed
```

Proyek sekarang sudah terinstal dan terkonfigurasi. Anda dapat melanjutkan dengan perintah untuk menjalankan proyek

# Jalankan Aplikasi
## client
```
> cd client
> yarn dev
```

## server
```
> cd server
> yarn dev
```