```yaml
version: 2.0
name: Portfolio Johan Krisbima Abi
description: >
  Portfolio pribadi bergaya Modern Rounded & Glassmorphism Dark/Light Theme dengan nuansa
  futuristik, sleek, dan profesional — dirancang khusus untuk Software Developer,
  Backend & Web Specialist. Menggunakan aksen gradien cyan, biru, dan indigo dengan
  efek glow ambient, kartu kaca semi-transparan, serta tipografi modern yang luwes dan tidak kaku.

themes:
  dark:
    colors:
      background: "#070a13" # deep obsidian navy
      surface: "#0f172a" # deep slate
      card: "rgba(17, 24, 39, 0.70)" # semi-transparent glass card
      card-hover: "rgba(30, 41, 59, 0.85)"
      glass: "rgba(15, 23, 42, 0.65)"
      text-main: "#f8fafc" # high-contrast white
      text-muted: "#94a3b8" # slate gray
      text-light: "#cbd5e1"
      accent-cyan: "#00f5d4" # vibrant neon cyan
      accent-blue: "#38bdf8" # sky blue
      accent-indigo: "#818cf8" # indigo accent
      accent-emerald: "#10b981" # online / available status
      gradient-primary: "linear-gradient(135deg, #00f5d4 0%, #38bdf8 50%, #818cf8 100%)"
      gradient-accent: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)"
      gradient-glow: "radial-gradient(circle, rgba(0, 245, 212, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
      border-glass: "rgba(255, 255, 255, 0.08)"
      border-active: "rgba(0, 245, 212, 0.40)"
      grid-line: "rgba(255, 255, 255, 0.075)"
      shadow: "rgba(0, 0, 0, 0.35)"

  light:
    colors:
      background: "#f4f7fd" # luxury ice-white / light slate
      surface: "#ffffff"
      card: "rgba(255, 255, 255, 0.88)"
      card-hover: "rgba(255, 255, 255, 0.98)"
      glass: "rgba(255, 255, 255, 0.88)"
      text-main: "#0f172a" # deep navy
      text-muted: "#475569" # slate
      text-light: "#1e293b"
      accent-cyan: "#0284c7" # deep ocean sky
      accent-blue: "#2563eb" # royal blue
      accent-indigo: "#6366f1"
      accent-emerald: "#059669"
      gradient-primary: "linear-gradient(135deg, #0284c7 0%, #3b82f6 45%, #7c3aed 100%)"
      gradient-accent: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)"
      gradient-glow: "radial-gradient(circle, rgba(2, 132, 199, 0.18) 0%, rgba(255, 255, 255, 0) 70%)"
      border-glass: "rgba(99, 102, 241, 0.18)"
      border-active: "rgba(2, 132, 199, 0.50)"
      grid-line: "rgba(37, 99, 235, 0.075)"
      shadow: "rgba(99, 102, 241, 0.12)"

typography:
  fontFamily: "Plus Jakarta Sans, sans-serif" # Modern, geometris luwes, ramah & tech-forward
  fontFamilyDisplay: "Outfit, Plus Jakarta Sans, sans-serif" # Opsi headline dinamis & premium
  h1:
    fontSize: "clamp(2.3rem, 5.5vw, 3.4rem)"
    fontWeight: 700 # Luwes & elegan, tidak over-bold kaku
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  h2:
    fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  h3:
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  caption:
    fontSize: "0.875rem"
    lineHeight: 1.5
    color: "{colors.text-muted}"

rounded:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "28px"
  xl: "36px"
  pill: "9999px"

glass:
  blur: "24px"
  saturation: "180%"
  borderWidth: "1px"

elevation:
  sm: "0 4px 12px {colors.shadow}"
  md: "0 10px 30px {colors.shadow}"
  lg: "0 20px 40px {colors.shadow}"
  glow: "0 0 30px rgba(0, 245, 212, 0.25)"
```

---

## Ringkasan Desain Sistem Johan Krisbima Abi

### 1. Warna & Visual Identity
- **Dark Theme (Default)**: Background bernuansa deep obsidian (`#070a13` dan `#0f172a`), dipadukan dengan aksen gradien neon cyan (`#00f5d4`), sky blue (`#38bdf8`), dan indigo (`#818cf8`). Memberikan kesan high-tech, modern, dan sangat selaras dengan profil Software Developer / Web Specialist.
- **Light Theme**: Background ice-white luxury (`#f4f7fd`) dengan kartu putih semi-transparan (`#ffffff`), border indigo halus, dan teks navy pekat (`#0f172a`) untuk keterbacaan sempurna.
- **Ambient Lighting Orbs**: Bola cahaya cyan & indigo blur 120px–140px di latar belakang dengan gridline teknis tipis 52px.

### 2. Tipografi yang Luwes & Tidak Kaku
- **Karakter Font**: Menggunakan font modern sans-serif yang dinamis, bersih, dan modern. Tidak memakai font serif klasik (seperti Fraunces) yang terkesan berat dan kaku untuk situs software engineer.
- **Hierarki Bobot Teks**:
  - Judul Utama (`h1`): Bobot 700 (bukan 800/900 yang terlalu tebal dan berat), dengan *letter-spacing* halus `-0.025em` dan *line-height* 1.18 yang proporsional.
  - Teks Gradien: Aksen gradien cyan-ke-biru pada nama **Johan Krisbima Abi** mempertegas identitas visual tanpa kaku.
  - Body Text: Menggunakan bobot 400 dengan *line-height* 1.7, memberikan ruang baca yang lega dan nyaman di mata.
  - Badge & Pill: Bobot 600 dengan huruf sedang, rapi, dan mudah dipindai.

### 3. Glassmorphism & Bentuk
- Semua kontainer kartu (Bento cards, Experience cards, Certificate cards, Terminal, Navbar) menggunakan sudut membulat modern (`radius-md: 20px`, `radius-lg: 28px`), efek blur kaca 24px, saturasi 180%, border halus 1px, dan shadow lembut.
- Tombol utama berbentuk kapsul (*pill shape*) dengan transisi halus dan micro-interaction hover yang responsif.
