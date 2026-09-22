# Redesign Brief — Website Portofolio Johan Krisbima Abi

**Referensi gaya:** Portofolio bertema diagonal-split, minimalis dengan judul section berbingkai (contoh: portofolio Tomasz Gajda), dipadukan palet **Navy & Emas** untuk kesan profesional-korporat
**Situs yang akan diredesign:** https://website-portofolio-johan.vercel.app/
**Tujuan:** Mengubah total tampilan visual (UI/UX) website menjadi tema profesional-korporat bernuansa navy & emas, TANPA mengubah konten/data yang sudah ada.

**Palet warna:**

| Token | Hex | Penggunaan |
|---|---|---|
| Navy (ink) | `#0A1F3D` | Teks utama, background gelap (hero kanan, strip banner, footer), border kotak judul |
| Putih gading (paper) | `#F7F5EF` | Background utama section terang |
| Krem gelap (paper-2) | `#EFEADD` | Background section selang-seling (Skills, Sertifikasi) |
| Abu kebiruan (muted) | `#5C6779` | Teks sekunder, deskripsi, label |
| Emas (gold) | `#C9A227` | Aksen: tombol CTA, underline menu aktif, nomor urut, label jabatan, hover state |
| Emas tua (gold-dark) | `#A9861D` | Hover tombol emas, aksen sekunder |

---

## Data yang Dipertahankan

- Nama: **Johan Krisbima Abi**
- Jabatan: Software Developer — Backend & Web Specialist
- Pendidikan: D4 Teknik Informatika, Politeknik Negeri Jember (IPK 3.87)
- Pengalaman: PT PAL Indonesia (BUMN), PT Universal Big Data, PT Stechoq Robotika Indonesia
- Sertifikasi: BNSP Web Developer, MagangHub, MSIB, PKM-PM Kemendikbudristek, UBig
- Lokasi: Mojokerto, Jawa Timur — Remote/On-site Ready
- Kontak: Email, WhatsApp, LinkedIn, GitHub, Instagram
- Fitur eksisting yang dipertahankan: toggle Dark/Light mode, toggle bahasa ID/EN, tombol Unduh CV, form auto-kirim ke WhatsApp

---

## 1. Hero Section (Home)

- Layout **split diagonal**: kiri latar putih gading (`#F7F5EF`) berisi teks perkenalan, kanan latar **navy pekat** (`#0A1F3D`) dengan foto diri (setengah badan) berbingkai tipis emas, dipotong garis diagonal sebagai pemisah dua warna.
- Navbar atas: logo/inisial **"JK"** di kiri, menu (Home, About, Experience, Sertifikat, Contact) di tengah/kanan dengan underline **emas** saat hover/aktif, tombol pill **emas** (`#C9A227`) bertuliskan **"Hubungi Saya"** atau **"Unduh CV"** di ujung kanan (teks navy di atas emas).
- Struktur teks:
  - "Hi, I'm" (kecil, abu kebiruan)
  - Nama besar, bold, huruf besar, warna navy
  - Tagline jabatan: "Software Developer — Backend & Web Specialist"
- 3–4 ikon sosial media (LinkedIn, GitHub, Instagram, WhatsApp/Email) berbentuk kotak kecil bergaris navy, berjejer di bawah tagline.
- Hilangkan elemen yang terlalu ramai (gradient warna-warni, badge berlebihan) → ganti dengan tipografi tegas, whitespace lega, dan aksen emas secukupnya sebagai penanda elemen penting.

## 2. Strip Banner

- Section tipis full-width, latar **navy pekat** (`#0A1F3D`), teks putih gading.
- Kalimat singkat positioning: *"Software Developer fokus pada arsitektur backend scalable & solusi enterprise"*.
- Tombol outline putih dengan hover berubah solid putih/navy: **"Baca Selengkapnya"**.
- Elemen watermark dekoratif transparan **emas tipis** (`rgba(201,162,39,.10)`, misal inisial "JK" besar) di sisi kanan.

## 3. About Me

- Latar putih gading, teks sekunder abu kebiruan.
- Judul section dalam **kotak border navy tipis**, huruf kapital, letter-spacing lebar: **"TENTANG SAYA"**.
- Ringkasan profil (asal kampus, IPK, pengalaman magang) dalam paragraf rapi, lebar dibatasi agar nyaman dibaca.
- 3 poin keahlian utama disusun grid dengan nomor urut **berwarna emas tua** (`#A9861D`) + judul + deskripsi singkat:
  1. **Backend Development**
  2. **Frontend / UI**
  3. **Project Management**
- Garis dekoratif tipis navy transparan sebagai pemisah antar sub-bagian.

## 4. Skills Section

- Latar krem gelap (`#EFEADD`) sebagai selang-seling section.
- Judul dalam **kotak border navy tebal**: **"SKILLS & KEAHLIAN"**.
- **Sedang Digunakan:** grid ikon teknologi asli (Laravel, PHP, JavaScript, MySQL, Bootstrap, Git, PostgreSQL, Node.js) dengan warna brand masing-masing + label di bawah ikon.
- **Sedang Dipelajari:** grid ikon skill yang sedang didalami.
- **Skill Lain:** soft skill & bahasa (ikon bendera Indonesia/Inggris untuk bahasa).
- Tampilan CLI/terminal interaktif dipindah menjadi easter egg opsional di bagian bawah halaman (bukan section utama), diganti grid ikon bersih di section Skills.

## 5. Experience & Project Section

- Latar putih gading.
- Judul dalam kotak border navy: **"PENGALAMAN & PROYEK"**.
- Tab filter di atas: **Semua / Enterprise / Automation / Backend** — filter aktif diberi garis bawah **emas**, teks minimalis.
- Setiap pengalaman kerja (PT PAL, UBig, Stechoq) ditampilkan sebagai card dengan border navy tipis, berisi:
  - Label jabatan berwarna **emas tua** (uppercase) + perusahaan + durasi
  - Deskripsi singkat
  - Badge tech stack (outline navy tipis)
  - Tombol outline navy **"Baca Detail"**
- Opsional: tambahkan galeri thumbnail project/dokumentasi dengan hover overlay (judul + tombol "Detail"), meniru grid portfolio pada referensi.

## 6. Sertifikasi Section

- Latar krem gelap (`#EFEADD`), kartu berlatar putih gading.
- Judul dalam kotak border navy: **"SERTIFIKASI & PENGHARGAAN"**.
- Grid card sertifikat: thumbnail gambar, nama penerbit (uppercase, abu kebiruan), judul, deskripsi, tanggal berlaku.
- Gaya kartu bersih dengan border navy tipis, tombol **"Pratinjau Dokumen"** outline navy.

## 7. Contact Section

- Latar putih gading.
- Judul dalam kotak border navy: **"KONTAK"**.
- Info lokasi (Mojokerto, Jawa Timur) dan status ketersediaan kerja ditampilkan ringkas di atas form, warna abu kebiruan.
- Form dengan input bergaya **underline navy minimalis** (tanpa kotak penuh):
  - Nama
  - Email / Perusahaan
  - Nomor WhatsApp
  - Pesan
- Tombol submit outline navy, berubah **solid emas** (teks navy) saat hover, terhubung ke WhatsApp (fitur auto-kirim yang sudah ada dipertahankan).

## 8. Footer

- Background **navy pekat** (`#0A1F3D`).
- Tombol **"Kembali ke Atas"** berwarna **emas** dengan ikon panah.
- Ikon sosial media abu kebiruan terang, berubah **emas** saat hover, berjejer di tengah.
- Teks copyright kecil abu kebiruan redup di bawah.

---

## Gaya Visual Keseluruhan

| Aspek | Ketentuan |
|---|---|
| Font judul | Sans-serif tebal, uppercase, letter-spacing lebar (contoh: Poppins / Montserrat Bold) |
| Font body | Reguler/light, mudah dibaca (contoh: Inter / Roboto) |
| Palet warna | Navy (`#0A1F3D`) – putih gading (`#F7F5EF`) – krem gelap (`#EFEADD`) sebagai dasar; **emas (`#C9A227`)** sebagai aksen selektif untuk CTA, underline, nomor, dan hover state; ikon skill tetap pakai warna asli brand tiap teknologi |
| Whitespace | Lega, banyak ruang kosong antar elemen |
| Pembatas section | Garis tipis navy transparan sebagai dekoratif, bukan blok warna tebal |
| Judul section | Dibingkai kotak border navy (outline), bukan solid background |
| Ritme warna antar section | Putih gading → navy (strip) → putih gading → krem gelap (Skills) → putih gading → krem gelap (Sertifikasi) → putih gading → navy (footer) |
| Dark/Light mode | Dipertahankan, disesuaikan dengan palet warna baru |
| Bahasa ID/EN | Dipertahankan |
| Responsif | Wajib mobile-friendly; hero menyesuaikan (foto di atas, teks di bawah pada layar kecil) |

---

## Prioritas Implementasi

1. Hero section (dampak visual pertama terbesar)
2. Skills section (grid ikon rapi menggantikan tampilan lama)
3. About Me & Experience (konsistensi judul berbingkai + card)
4. Sertifikasi & Contact (penyesuaian gaya form dan card)
5. Footer & detail dekoratif (garis pemisah, watermark, tombol back-to-top)
