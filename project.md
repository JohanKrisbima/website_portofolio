# Prompt: Menambahkan Section "Projects" (Layout Editorial Alternating)

Tambahkan section baru bernama **"Projects"** ke website portofolio saya, diletakkan setelah section Experience dan sebelum section Sertifikasi. Gunakan layout **editorial alternating (zig-zag)** — bukan grid kartu seperti section lain — supaya ritme visual situs tidak monoton.

---

## 1. Struktur Layout

- Judul section dalam kotak border navy (konsisten dengan section lain): **"PROJECTS"**.
- Setiap proyek ditampilkan sebagai **satu baris penuh** dengan 2 kolom: gambar/screenshot di satu sisi, teks di sisi lain.
- Posisi **bergantian per baris** (zig-zag): baris ganjil (gambar kiri, teks kanan), baris genap dibalik (teks kiri, gambar kanan).
- Tiap baris dipisahkan garis tipis horizontal (border-bottom), baris pertama tanpa padding atas, baris terakhir tanpa border bawah.

## 2. Konten per Proyek

Setiap baris berisi:
- **Kolom gambar**: screenshot/thumbnail proyek dengan badge kategori kecil di pojok kiri atas (misal "IoT", "Computer Vision", "Web Development").
- **Kolom teks**:
  - Label index kecil di atas: "PROJECT 01 / 04", "02 / 04", dst.
  - Judul proyek (besar, bold)
  - Periode + afiliasi ("Sep 2023 – Des 2023 · Politeknik Negeri Jember")
  - Deskripsi 2–3 kalimat (tulisan sendiri, bukan copy-paste dari LinkedIn)
  - Badge tech stack kecil (outline tipis)
  - Tombol aksi: **"Lihat GitHub"** (selalu ada) + **"Video Demo"** (hanya jika proyek punya link YouTube/demo)

## 3. Data 4 Proyek yang Ditambahkan

| # | Proyek | Periode | Kategori | Tech Stack | Link |
|---|---|---|---|---|---|
| 1 | Auto-Feeding System using IoT with Website Monitoring | Sep–Des 2023 | IoT | ESP32, PHP, Fuzzy Tsukamoto | [GitHub](https://github.com/JohanKrisbima/Auto-feeding-system-using-IoT-with-website-monitoring) · [Video](https://www.youtube.com/watch?v=5Zd607Si5Zw) |
| 2 | Coffee Detection System using Webcam | Sep–Des 2023 | Computer Vision | Python, YOLOv5 | [GitHub](https://github.com/JohanKrisbima/Training-Data-Detection-kopi-with-yolo5) · [Video](https://www.youtube.com/watch?v=bIaLn3YdVGM) |
| 3 | Photo Sales Website "POVSHOTNBK" | Mar–Jun 2023 | Web Development | Laravel, Full-Stack, Payment Gateway | [GitHub](https://github.com/JohanKrisbima/Website-PovShotnbk_) |
| 4 | Website E-Commerce "Ilham Collection" | Jun–Okt 2022 | Web Development | PHP Native, MySQL, Back-End | [GitHub](https://github.com/JohanKrisbima/Ilham-collection-Web) |

## 4. Gaya Visual

- Palet navy (`#0A1F3D`) + putih gading (`#F7F5EF`), tanpa emas.
- Badge kategori: solid navy background, teks putih, uppercase, letter-spacing lebar.
- Tombol "Lihat GitHub": outline navy, hover jadi solid navy dengan teks putih.
- Tombol "Video Demo": outline abu-abu tipis (sekunder), hover jadi solid navy.
- Tipografi: judul proyek pakai font Space Grotesk, deskripsi pakai Work Sans, ukuran teks lebih besar dari kartu biasa karena tiap proyek dapat ruang sendiri.

## 5. Responsif

- Di layar mobile (di bawah ~760px): urutan gambar dan teks **selalu gambar di atas, teks di bawah** — pola zig-zag dinonaktifkan agar tetap mudah dibaca secara linear di layar sempit.
- Grid 2 kolom berubah jadi 1 kolom penuh.

## 6. Perilaku

- Tambahkan link "Projects" baru di navbar, mengarah ke anchor `#projects`.
- Semua tombol link (GitHub, Video Demo) membuka di tab baru (`target="_blank" rel="noopener"`).
- Struktur data dibuat scalable (array/object per proyek) agar mudah menambah proyek baru ke depannya tanpa mengubah struktur CSS.
