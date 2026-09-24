# Redesign Brief — Website Portofolio Johan Krisbima Abi

**Referensi gaya:** Portofolio bertema diagonal-split, minimalis dengan judul section berbingkai (terinspirasi dari gaya minimalis monokrom editorial Tomasz Gajda), dipadukan palet **Navy, Putih Gading & Slate** untuk kesan profesional, modern, dan korporat bersih tanpa bentrok warna.
**Situs:** https://website-portofolio-johan.vercel.app/
**Tujuan:** Mengoptimalkan tampilan visual (UI/UX) website menjadi tema profesional-korporat yang rapi, elegan, berwibawa, dan berfokus pada hierarki konten yang jelas TANPA menggunakan warna emas agar tidak bentrok dengan warna brand teknologi (tech stack).

---

## Palet Warna (Navy & Neutral Corporate — No Gold)

| Token | Hex / Nilai | Penggunaan |
|---|---|---|
| Navy (ink) | `#0A1F3D` | Teks utama, background gelap (hero kanan, strip banner, footer), border kotak judul, aksen tombol solid, active state |
| Putih gading (paper) | `#F7F5EF` | Background utama section terang (Home kiri, About, Pengalaman, Kontak) |
| Krem lembut (paper-2) | `#EFEADD` | Background section selang-seling ritmik (Skills, Projects, Sertifikasi) |
| Abu kebiruan (muted) | `#5C6779` | Teks sekunder, deskripsi paragraf, label waktu, pembatas halus |
| Kartu Putih (card) | `#FFFFFF` | Latar belakang kartu (pillar, skills, experience, project, cert) agar kontras bersih di atas latar ivory/krem |
| Border Subtil | `rgba(10, 31, 61, 0.18)` | Garis pembatas kartu, separator, dan outline elegan |
| Dark Mode Base | `#061122` / `#0A1A33` | Background utama mode gelap (midnight navy pekat) |
| Dark Mode Text | `#FFFFFF` / `#94A3B8` | Teks utama putih & teks sekunder slate terang di dark mode |
| Brand Tech Logos | Original Colors | Warna brand asli (Laravel merah, MySQL biru, React biru muda, dll.) tampil otentik tanpa tabrakan warna |

> **Prinsip Utama:** Tidak ada aksen emas (gold). Semua aksen interaktif (tombol, garis aktif, counter) menggunakan perpaduan tegas **Navy pekat (`#0A1F3D`)** dan **Putih/Ivory**, memberikan estetika monokrom profesional arsitektural yang clean, matang, dan elegan.

---

## Data yang Dipertahankan

- Nama: **Johan Krisbima Abi**
- Jabatan: Software Developer — Backend & Web Specialist
- Pendidikan: D4 Teknik Informatika, Politeknik Negeri Jember (IPK 3.87)
- Pengalaman: PT PAL Indonesia (BUMN), PT Universal Big Data, PT Stechoq Robotika Indonesia
- Sertifikasi: BNSP Web Developer, MagangHub Kemnaker, MSIB Kampus Merdeka, PKM-PM Kemendikbudristek, UBig
- Lokasi: Mojokerto, Jawa Timur — Remote / On-site Ready
- Kontak: Email, WhatsApp, LinkedIn, GitHub, Instagram
- Fitur interaktif: Toggle Dark/Light mode, toggle bahasa ID/EN, download CV (PDF), terminal CLI interaktif (easter egg), filter kategori, form auto-kirim ke WhatsApp, toast notification, preview modal sertifikat.

---

## 1. Hero Section (Home)

- **Layout Split Diagonal:**
  - **Sisi Kiri:** Latar putih gading (`#F7F5EF`), berisi teks perkenalan, availability status pill, nama tegas, typewriter role, bio padat, tombol sosial media bergaris navy, serta CTA buttons.
  - **Sisi Kanan:** Latar navy pekat (`#0A1F3D`), dipotong garis diagonal geometris presisi, menampilkan foto portrait eksekutif berjas dan berdasi dalam bingkai arsitektural elegan (*Executive Portrait Showcase Card*) dengan backdrop offset geometris khas Tomasz Gajda, floating status pill (*Available for Opportunities*) dan badge pengalaman (*1+ Year Experience*), serta watermark inisial "JK" transparan. Ukuran proporsional (~340px lebar, 400px tinggi) terpusat rapi dan tidak memakan seluruh layar.
- **Navbar Atas (Floating Navbar):**
  - Logo inisial **"JK"** dalam kotak monogram navy di kiri.
  - Menu navigasi (Home, About, Skills, Experience, Projects, Sertifikat, Awards, Contact) dengan garis bawah (**navy underline**) saat hover & aktif.
  - Tombol **"Unduh CV"** bergaya solid navy (teks putih) atau outline tegas.
  - Tombol switcher Bahasa (ID / EN) dan switcher Tema (Dark / Light).
- **Struktur Teks Hero:**
  - Status pill: *"Tersedia untuk Peluang Baru • Remote / On-site"*
  - "Hi, I'm" (font uppercase, abu kebiruan/navy)
  - Nama: **JOHAN KRISBIMA ABI** (besar, bold, uppercase, navy pekat)
  - Typewriter role: *"Software Developer"*
  - Bio deskriptif fokus pada RESTful API, otomatisasi web, & sistem enterprise yang andal.
- **CTA Hero:**
  - Tombol 1: **"Hubungi Saya"** (outline navy, hover solid navy teks putih)
  - Tombol 2: **"Unduh CV"** (solid navy, hover navy-dark teks putih)
- **Sosial Media:** Ikon kotak bergaris navy (LinkedIn, GitHub, Instagram, Email, WhatsApp) dengan efek hover inversi warna.

---

## 2. Strip Banner Section

- Section tipis pemisah full-width berlatar **navy pekat** (`#0A1F3D`) dengan teks putih gading.
- Badge kategori: *"IT SERVICES & DEVELOPMENT"*
- Positioning headline: *"Software Developer fokus pada arsitektur backend scalable & solusi enterprise"*.
- Tombol: **"Baca Selengkapnya"** outline putih dengan ikon panah, bertransisi menjadi solid putih teks navy saat hover.
- Watermark tipis transparan *"DEV"* di sudut kanan.

---

## 3. About Me Section

- Latar belakang putih gading (`#F7F5EF`).
- Judul section dalam **kotak border navy** dengan ornamen garis: **"TENTANG SAYA"**.
- Paragraf profil ringkas mengenai latar belakang D4 Teknik Informatika Polije (IPK 3.87) dan pengalaman di PT PAL Indonesia.
- Pill badges informasi kunci: Kampus & IPK, Lisensi BNSP SKKNI, Hibah Nasional PKM-PM.
- **3 Pilar Keahlian Utama (Grid Card):**
  1. **Backend Development** — Arsitektur API, database relational, skalabilitas enterprise.
  2. **Frontend & Web UI** — Antarmuka responsif, JavaScript modern, Bootstrap, kenyamanan pengguna.
  3. **Project Management** — Analisis sistem, dokumentasi UAT, metodologi agile, pengujian.
  - Masing-masing kartu berlatar putih dengan nomor urut navy (`01`, `02`, `03`), ikon box rapi, judul uppercase, dan deskripsi terstruktur.
- **Bar Unduh CV:** Baris kartu putih rapi dengan ikon dokumen PDF, rincian file, dan tombol unduh langsung.

---

## 4. Skills & Keahlian Section

- Latar belakang krem lembut (`#EFEADD`) sebagai selang-seling section.
- Judul berbingkai kotak navy: **"SKILLS & KEAHLIAN"**.
- Pengelompokan kategori yang jelas:
  - **USING NOW (Sedang Digunakan):** Laravel, PHP, JavaScript, MySQL, PostgreSQL, Node.js, Express Js, Bootstrap, Git, HTML5, CSS3.
  - **LEARNING (Sedang Dipelajari):** React, TypeScript, Next.js, Tailwind CSS.
  - **OTHER SKILLS & LANGUAGES:** Bahasa Indonesia (Native), English (Passive), Postman, RESTful API, Project Management.
- Tampilan kartu skill: Kotak putih bersih bergaris subtil dengan ikon Devicon berwarna brand asli masing-masing teknologi + label teks di bawah ikon, dilengkapi efek hover angkat (lift) yang halus.
- **CLI Terminal Interaktif:** Tombol collapse untuk membuka terminal emulator interaktif (johan@portfolio:~) sebagai fitur eksplorasi teknis opsional.

---

## 5. Experience & Projects Section

- Latar belakang putih gading (`#F7F5EF`).
- Judul kotak border navy: **"PENGALAMAN & PROYEK"**.
- Tombol filter kategori dengan indikator garis bawah navy: **Semua / Enterprise / Automation / Backend**.
- Kartu pengalaman kerja terstruktur (PT PAL Indonesia, PT Universal Big Data, PT Stechoq Robotika Indonesia):
  - Header: Posisi / Role (navy bold), Nama Perusahaan, dan Pill Periode kerja.
  - Deskripsi kontribusi teknis.
  - Pada PT PAL Indonesia: 4 sub-proyek (Siamang, Simandok, Ebidding, Subkon) disajikan dalam kotak-kotak komponen rapi.
  - Tag pill teknologi (Laravel, MySQL, C#, Node.js, dll.) bergaris rapi.
  - Footer kartu: Badge *"Dokumentasi Terverifikasi"* dan tombol outline navy **"Baca Detail"** yang mengarah ke halaman studi kasus lengkap.

---

## 6. Projects Section (Editorial Showcase)

- Latar belakang krem lembut (`#EFEADD`).
- Judul berbingkai kotak: **"PROJECTS"**.
- Layout editorial berselang-seling (zig-zag):
  - **Project 01:** Auto-Feeding System using IoT with Website Monitoring (ESP32, PHP, Fuzzy Tsukamoto).
  - **Project 02:** Coffee Detection System using Webcam (Python, YOLOv5, PyTorch, OpenCV).
  - **Project 03:** Photo Sales Website "POVSHOTNBK" (Laravel, Midtrans, MySQL).
  - **Project 04:** Website E-Commerce "Ilham Collection" (PHP Native, MySQL).
- Elemen tiap proyek: Wadah media thumbnail dengan badge kategori solid navy di sudut kiri atas, label indeks (*PROJECT 01 / 04*), judul tebal, periode & afiliasi, deskripsi ringkas, tech pills, serta tombol aksi **"LIHAT GITHUB"** & **"VIDEO DEMO"**.

---

## 7. Sertifikasi & Honors Section

- Latar belakang krem lembut (`#EFEADD`) & putih gading (`#F7F5EF`).
- Filter kategori: **Semua / BNSP / Magang / Prestasi**.
- Grid card sertifikat berlatar putih dengan border rapi:
  - Header: Tag lembaga penerbit (BNSP RI, MagangHub, MSIB, UBiG) & badge terverifikasi.
  - Thumbnail dokumen sertifikat dengan overlay hover zoom **"Pratinjau Dokumen"** (membuka modal lightbox).
  - Judul sertifikat, instansi penerbit, deskripsi cakupan, tanggal berlaku, dan badge predikat.
- **Honors Card (Penghargaan PKM-PM Kemendikbudristek):**
  - Kartu khusus dengan rincian pendanaan riset nasional sistem deteksi dini banjir Web GIS.
  - Dua kartu pratinjau thumbnail dokumen berdampingan (Sertifikat Pendanaan & Dokumentasi Lapangan).
  - Kutipan publikasi artikel ilmiah di *Jurnal Akademik Pengabdian Masyarakat (2024)* disertai tombol link langsung ke e-journal.

---

## 8. Contact Section & Form

- Latar belakang putih gading (`#F7F5EF`).
- Judul berbingkai kotak: **"KONTAK"**.
- Chip lokasi domisili: *Mojokerto, Jawa Timur • Remote / On-site Ready*.
- Form kontak bergaya **underline minimalis navy** (Nama/Perusahaan, Pilihan Topik Kebutuhan, Pesan).
- Tombol submit berbingkai tegas: **"KIRIM KE WHATSAPP"** yang otomatis memformat dan membuka WhatsApp chat.
- Tombol akses cepat (Direct Channels): Copy email satu-klik, link LinkedIn, GitHub, Instagram.

---

## 9. Footer

- Background full-width **navy pekat** (`#0A1F3D`) dengan teks putih dan muted slate.
- Kolom 1: Monogram brand "JK", bio singkat lulusan Polije, dan ikon jejaring sosial.
- Kolom 2: Navigasi cepat halaman (Eksplorasi).
- Kolom 3: Rangkuman 4 pilar keahlian utama.
- Kolom 4: Informasi rekrutmen (domisili, status ketersediaan kerja segera, mobilitas kerja, link unduh CV resmi).
- Tombol floating: **Back to Top** (kembali ke atas) dan **Theme Switcher** (Dark / Light mode).

---

## Gaya Visual Keseluruhan

| Aspek | Ketentuan |
|---|---|
| Tipografi Judul | Sans-serif modern tegas, uppercase (Montserrat / Plus Jakarta Sans) |
| Tipografi Isi | Bersih, nyaman dibaca (Inter / Plus Jakarta Sans) |
| Palet Warna Utama | Navy (`#0A1F3D`) & Putih Gading (`#F7F5EF`), dengan variasi Krem (`#EFEADD`) dan Slate (`#5C6779`) |
| Warna Emas | **DITIADAKAN** secara menyeluruh agar palet tetap tenang, konsisten, dan tidak bentrok dengan logo teknologi |
| Border & Box | Garis border navy tegas dan tipis (outline minimalis), konsisten pada judul berbingkai, tombol, dan kartu |
| Responsif | Mobile-first responsif: hero otomatis bertransformasi foto di atas dan teks di bawah pada layar smartphone |
