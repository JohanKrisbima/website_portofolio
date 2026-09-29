# Design System & Style Guide — Website Portofolio Johan Krisbima Abi

Dokumen ini merupakan panduan acuan desain (*single source of truth*) yang diselaraskan secara langsung dengan implementasi [index.html](file:///d:/Web%20Profile/porto/index.html). Seluruh halaman baru maupun redesain halaman detail studi kasus (`views/detail-pt-pal.html`, `views/detail-stechoq.html`, `views/detail-universal-big-data.html`) **wajib** mematuhi panduan ini agar pengalaman visual dan interaksi tetap seragam, kohesif, dan premium.

---

## 1. Filosofi & Arah Desain (*Design Direction*)

- **Gaya:** *Lumora Modern Editorial & Studio Minimalist*.
- **Karakter:** Bersih, arsitektural, elegan, dan profesional tanpa dekorasi berlebihan (*anti-slop*).
- **Nuansa Visual:** Kontras tajam antara kanvas terang (*warm ivory / clean white*) dengan kartu aksen hitam pekat (*ink black*) dan sentuhan warna tembaga hangat (*warm terracotta / sienna*).
- **Bahasa Geometri:** Bentuk kapsul melingkar penuh (*pill / capsule* `border-radius: 9999px`) untuk tombol, badge, dan chip filter, dipadukan dengan kartu bersudut lengkung halus (`1.25rem` – `2rem` / 20px – 32px).
- **Bahasa Konten:** Bahasa Indonesia statis yang formal, lugas, percaya diri, dan berfokus pada hasil rekayasa perangkat lunak nyata.

---

## 2. Palet Warna & Desain Token (*Color Tokens*)

```css
:root {
  /* Kanvas & Teks Utama */
  --background: #ffffff;         /* Latar belakang dasar halaman */
  --foreground: #111111;         /* Teks utama (deep charcoal/black) */
  --ink: #0a0a0a;                /* Hitam pekat pekat untuk kartu kontras & footer */
  --muted: #8d8d8d;              /* Teks sekunder, label, deskripsi tambahan */
  --subtle: #b6b6b6;             /* Garis atau teks penjelas tersier */
  --line: #e6e5e2;               /* Garis batas kartu & pembatas halus (border) */

  /* Permukaan Kartu (Surfaces) */
  --surface: #f1f0ee;            /* Permukaan kartu hangat / off-white */
  --surface-2: #e3e2df;          /* Permukaan sekunder lebih kontras */

  /* Warna Aksen Utama (Terracotta / Sienna Warm) */
  --accent: #b15f2c;             /* Aksen terakota hangat (brand signature) */
  --accent-from: #cf8047;        /* Gradien aksen awal */
  --accent-to: #97501f;          /* Gradien aksen akhir */

  /* Sudut Lengkung (Border Radii) */
  --radius-pill: 9999px;         /* Tombol kapsul, chip, badge */
  --radius-card: 2rem;           /* Kartu showcase besar (32px) */
  --radius-card-sm: 1.25rem;      /* Kartu standar / sub-komponen (20px) */
  --radius-control: 0.875rem;    /* Kontrol form / input (14px) */

  /* Kurva Animasi (Spring & Ease Timing) */
  --ease-spring-snappy: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-spring-gentle: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Palet Khusus Komponen Gelap (Dark Ink Cards)
Untuk kartu proyek, kartu pengalaman BUMN, atau section gelap:
- **Card Background:** `#141414` (Matte Solid Ink Black)
- **Card Border:** `1px solid rgba(255, 255, 255, 0.05)`
- **Category Badge:** `#252526` (Teks `#bcbcbf`, font-weight 700, 0.72rem)
- **Tag Chip Gelap:** `#1c1c1e` (Border `1px solid rgba(255, 255, 255, 0.12)`, teks `#dedede`)
- **Pill Button Gelap:** `#1a1a1c` (Border `1px solid rgba(255, 255, 255, 0.22)`, teks `#ffffff`, font-weight 600)

---

## 3. Tipografi (*Typography*)

| Elemen | Font Family | Weight | Ukuran (Desktop) | Ukuran (Mobile) | Karakteristik |
|---|---|---|---|---|---|
| **Headings Utama (H1)** | `Plus Jakarta Sans`, sans-serif | 800 (Bold) | `3.25rem – 3.75rem` | `2.25rem` | Tracking ketat (`-0.02em`), line-height `1.1` |
| **Section Titles (H2)** | `Plus Jakarta Sans`, sans-serif | 700 | `2.25rem – 2.75rem` | `1.65rem` | Tegas, profesional, margin-bottom terukur |
| **Card Titles (H3)** | `Plus Jakarta Sans`, sans-serif | 700 | `1.2rem – 1.35rem` | `1.15rem – 1.28rem` | Huruf proporsional, line-height `1.25` |
| **Eyebrow / Label** | `Plus Jakarta Sans`, sans-serif | 700 | `0.72rem – 0.75rem` | `0.7rem` | Uppercase, tracking lebar (`0.06em`) |
| **Body Paragraph** | `Onest` / `Inter`, sans-serif | 400 / 500 | `0.9375rem – 1rem` | `0.875rem` | Line-height `1.6 – 1.7`, warna `rgba(17,17,17,0.7)` |
| **Chip / Pill Label** | `Onest` / `Inter`, sans-serif | 500 / 600 | `0.75rem – 0.8125rem` | `0.75rem` | Ringkas, padding vertikal nyaman |

---

## 4. Komponen Sistem UI (*Reusable Components*)

### 1. Tombol Pill (`.pill-btn`)
Tombol berbentuk kapsul (`border-radius: 9999px`) tanpa sudut siku:
- **`.pill-dark`:** Background `#111111`, teks `#ffffff`. Saat hover: `transform: translateY(-2px); background: #222222;`.
- **`.pill-light`:** Background `#ffffff`, border `1px solid var(--line)`, teks `#111111`.
- **`.pill-outline`:** Background transparan, border `1px solid var(--line)`, teks `#111111`.
- **`.pill-accent`:** Background `var(--accent)` (`#b15f2c`), teks `#ffffff`.
- **`.with-arrow`:** Memiliki wadah ikon panah di kanan (`.pill-btn-badge`).
- **`.no-arrow`:** Tombol kapsul teks bersih tanpa ikon panah (misal: tombol *Github Repo* atau *Video Demo*).

### 2. Badge Kategori & Eyebrow (`.eyebrow`)
- Menggunakan kapsul tipis dengan teks uppercase dan `letter-spacing: 0.05em`.
- Didahului titik aksen (`.eyebrow-dot`) dengan warna terakota `var(--accent)`.

### 3. Kartu Kapabilitas 4 Warna (*Competency Highlights*)
Digunakan baik pada desktop (`#capabilitiesBand`) maupun baris swipe mobile (`.hero-mobile-comp-row`) dengan urutan standar:
1. **01 · AKADEMIK & RISET** (*Politeknik Negeri Jember*)
   - Gaya: `.card-ghost` / `.comp-card-light` (putih bersih, border halus).
   - Metrik: `IPK 3.87 / 4.00`.
2. **02 · PENGALAMAN BUMN** (*PT PAL Indonesia*)
   - Gaya: `.card-dark` / `.comp-card-dark` (hitam pekat `#141414`, badge terakota, teks putih).
   - Metrik: `Contract Verified`.
3. **03 · OTOMASISASI & SCRAPING** (*Web Automation Specialist*)
   - Gaya: `.card-accent` / `.comp-card-accent` (warna terakota `#b15f2c`, teks putih).
   - Metrik: `High Accuracy`.
4. **04 · ARSITEKTUR BACKEND** (*RESTful API & Database*)
   - Gaya: `.card-light` / `.comp-card-light` (off-white surface, teks hitam arsitektural).
   - Metrik: `1+ Tahun`.

### 4. Kartu Proyek (*Portfolio Dark Card*)
- Menggunakan tema hitam pekat (`#141414`) dengan padding `1.5rem` dan sudut melengkung `1.5rem` (24px).
- Hierarki:
  1. Pill Kategori di atas (`IOT · OTOMASI`, `COMPUTER VISION`, `WEB PLATFORM`, `E-COMMERCE`).
  2. Judul Proyek tebal warna putih (`#ffffff`).
  3. Deskripsi ringkas warna abu-abu netral (`#9e9ea3`).
  4. Baris Tag Chip gelap (`#1c1c1e`).
  5. Baris Tombol Aksi gelap seragam (`Github Repo`, `Video Demo`).

### 5. Kartu Pengalaman (*Experience Item Card*)
- Latar putih `#ffffff`, border `1px solid var(--line)`, sudut `var(--radius-card)`.
- Informasi: Jabatan, Nama Perusahaan (warna terakota), Badge periode kerja.
- Daftar bernomor rapi untuk proyek enterprise yang dikerjakan.
- Footer kartu: deretan tag stack dan tombol pill `Detail Case Study`.

---

## 5. Standar Desain Halaman Detail Studi Kasus (`views/detail-*.html`)

Ketika merancang atau meredesain halaman detail studi kasus (misalnya *PT PAL Indonesia*, *Stechoq*, atau *UBiG*), struktur berikut **wajib diterapkan**:

### A. Navigasi Atas (*Header & Breadcrumb*)
- Bar navigasi minimalis mengambang (*floating navbar*) dengan tombol kembali:
  - Tombol: `← Kembali ke Portofolio` (menggunakan `.pill-btn .pill-outline`).
  - Label breadcrumb: `Beranda / Pengalaman / PT PAL Indonesia`.
  - Aksi cepat di pojok kanan: Tombol `Unduh CV` atau tautan kontak.

### B. Header Studi Kasus (*Case Study Hero*)
- **Badge Kategori:** `.eyebrow` misal: `STUDI KASUS ENTERPRISE • BUMN MARITIM`.
- **Judul Utama:** Nama posisi/peran tebal (H1: *Pengembangan 4 Sistem Web Inti Galangan Kapal*).
- **Sub-headline & Instansi:** Nama perusahaan dengan warna `var(--accent)`, periode kerja, dan lokasi.
- **Ringkasan Ringkas (*Executive Summary*):** Paragraf pembuka yang menonjolkan tanggung jawab dan pencapaian utama.
- **Matriks Metrik Kunci (*Impact Stats Bar*):**
  - Grid 3 atau 4 kartu ringkas:
    - *4 Sistem Produksi* (Subkon, Simandok, Siamang, Ebidding).
    - *100% UAT Pass Rate* (Pengujian penerimaan pengguna tuntas).
    - *Multi-Role Access Control* (Keamanan hierarki peran ketat).
    - *Enterprise Database* (Relasi kompleks data operasional kapal).

### C. Pembagian Bab Konten (*Content Sections*)
1. **Latar Belakang & Tantangan Bisnis (*Context & Challenge*)**:
   - Kartu penjelasan masalah operasional yang dihadapi galangan kapal / perusahaan mitra.
2. **Arsitektur Teknis & Solusi (*Architecture & Solution*)**:
   - Diagram alur logika / skema data.
   - Poin-poin arsitektur backend, validasi keamanan, dan optimasi query.
   - Modul proyek yang dirancang secara terperinci.
3. **Teknologi yang Digunakan (*Tech Stack Pills*)**:
   - Deretan chip kapsul (`.tag-chip`) yang mengelompokkan bahasa, framework, database, dan tools pengujian.
4. **Hasil & Dampak (*Outcomes & Deliverables*)**:
   - Dokumentasi UAT, sistem yang aktif digunakan, efisiensi waktu operasional tim.

### D. Navigasi Antar Studi Kasus (*Case Study Footer Nav*)
- Bagian bawah halaman menyediakan navigasi ke studi kasus sebelumnya dan berikutnya:
  - `← Studi Kasus Sebelumnya` | `Studi Kasus Berikutnya →`
- CTA penutup: Ajakan berkolaborasi dengan tombol `Hubungi Saya` dan tautan LinkedIn/WhatsApp.

---

## 6. Prinsip Responsif & Mobile-First

- **Breakpoint Kunci:**
  - Mobile: `< 768px` (padding horizontal `1.25rem`, kartu adaptif, swipe horizontal pada kelompok kapabilitas).
  - Tablet: `768px – 1023px` (grid 2 kolom).
  - Desktop: `≥ 1024px` (grid 3 atau 4 kolom, padding horizontal shell `2rem`).
- **Touch-Friendly:** Semua tombol dan area klik interaktif memiliki target minimal `44px x 44px`.
- **No Overflow X:** Tidak boleh ada elemen yang menyebabkan scrollbar horizontal pada body layar HP. Seluruh carousel/swipe dibatasi di dalam kontainer ber-`overflow-x: auto` dengan `scrollbar-width: none`.
