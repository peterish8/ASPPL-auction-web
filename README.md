<div align="center">

  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge&logo=rss" alt="Status" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <br />
  <br />

  <h1>🌿 Amazing Spice Park Private Limited</h1>
  <h3>Trade Booking System</h3>
  
  <p>
    <b>A modern, secure, and responsive platform for managing cardamom trade bookings.</b>
    <br />
    Designed for seamless interaction between farmers, traders, and administrators.
  </p>

  <br />

  <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Card%20Index.png" alt="Card Index" width="100" />
</div>

---

## ✨ Features

### 🚀 **For Traders & Farmers**
-   **Live Trade Status**: Instantly see active trade numbers and dates.
-   **Smart Booking Form**: 
    -   Auto-validating fields for Name, Phone, and Quantity.
    -   Duplicate submission prevention for the same trade week.
-   **Pooling Schedule**: Viewing dynamic collection points and dates.
-   **Device Fingerprinting**: Advanced security to prevent spam and ensure fair access.
-   **Mobile-First Design**: Optimized for use on field-site mobile connections.

### 🛡️ **Technology Stack**
| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [Next.js 14](https://nextjs.org/) | React Framework for performance and SEO |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Rapid, utility-first styling |
| **Database** | [Supabase](https://supabase.com/) | PostgreSQL database with real-time capabilities |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe code for reliability |
| **Security** | [FingerprintJS](https://fingerprint.com/) | Unique device identification |

---

## 🛠️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/peterish8/ASPPL-auction-web.git
    cd ASPPL-auction-web
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Configuration**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` to see the app live!

---

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with fonts & metadata
│   ├── page.tsx          # Main booking page (SSR + Client)
│   └── success/          # Submission success page
├── components/           # Reusable UI Components
│   ├── BookingForm.tsx   # Complex form logic
│   ├── Header.tsx        # Dynamic header with trade info
│   └── ui/               # Atomic design elements (Inputs, Buttons)
├── lib/                  # Utilities
│   ├── supabase.ts       # Database client
│   └── validation.ts     # Zod schemas
└── types/                # TypeScript interfaces
```

---

<div align="center">
  <br />
  <p>Built with ❤️ for the Cardamom Industry</p>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=059669&height=100&section=footer" width="100%" />
</div>
