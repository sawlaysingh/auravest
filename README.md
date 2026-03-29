<div align="center">
  <img src="C:\Users\Sawlay Singh\.gemini\antigravity\brain\ff31be5c-0b48-4bb4-848f-3c50069440a5\auravest_premium_logo_v1774844528000_v1774844528000_v_final_1774855660000_v_final_1774866792000_1774796004619.png" width="200" alt="Auravest Logo">
  <h1>Auravest</h1>
  <p><strong>Your Private Financial Oasis</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-v16-black?logo=next.js)](https://nextjs.org/)
  [![Auth.js](https://img.shields.io/badge/Auth.js-v5-6c8cff?logo=auth0)](https://authjs.dev/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
  [![SQLite](https://img.shields.io/badge/SQLite-DB-003B57?logo=sqlite)](https://www.sqlite.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
</div>

---

## ✦ Overview
**Auravest** is a premium, AI-powered financial management platform designed to unify your budgeting, investment tracking, and tax optimization into one stunning, glassmorphic interface. Built for the modern investor, Auravest moves beyond spreadsheets to provide proactive, intelligent financial growth.

> [!IMPORTANT]
> This platform uses a secure, session-driven authentication system. All financial data is isolated per user to ensure maximum privacy and account integrity.

---

## 🚀 Key Features

### 🏦 Smart Wealth Tracking
*   **Unified Dashboard**: A high-fidelity overview of your total net worth and liquidity.
*   **Investment Portfolio**: Real-time tracking of stocks, ETFs, crypto, and traditional assets.
*   **Cash Flow & Budgeting**: Automated categorization and limit alerts to prevent overspending.

### 🤖 Intelligent Insights
*   **AI Predictive Analytics**: Monte Carlo simulations and risk scoring for your long-term goals.
*   **Tax Optimization**: Capital gains tracking and tax-loss harvesting recommendations.
*   **Goal Mastery**: Visual progress tracking for savings, home ownership, and retirement.

### 🎮 Personalized Gamification
*   **Financial XP**: Earn points for smart financial habits like consistent budgeting.
*   **Savings Leaderboard**: Compete with yourself and the community (anonymized) to reach rank milestones.
*   **Badges & Streaks**: Visual rewards for hitting key financial milestones.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Authentication**: [Auth.js v5 (Beta)](https://authjs.dev/) — Secure sessions & edge-compatible protection.
- **Database**: [Prisma ORM](https://www.prisma.io/) with **SQLite** for lightweight, persistent storage.
- **Styling**: **Vanilla CSS (Design Tokens)** — Custom-built 'Oasis' theme with glassmorphism and dynamic dark/light modes.
- **Visuals**: [Chart.js](https://www.chartjs.org/) & [Lucide React](https://lucide.dev/) for data storytelling.
- **Security**: **BcryptJS** for military-grade password hashing and JWT-based session management.

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** and **npm** installed.

### 2. Installation
```bash
git clone https://github.com/sawlaysingh/auravest.git
cd auravest
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secret-here" # Generate via `npx auth secret`
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Initialization
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Launch
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to experience the oasis.

---

## 📂 Project Architecture

```text
auravest/
├── prisma/               # Database schema & migrations
├── src/
│   ├── app/              # Next.js App Router (Dashboard, Auth, etc)
│   ├── components/       # Premium React components (Layout, UI)
│   ├── lib/              # Shared logic (Prisma Client, Auth config)
│   └── styles/           # Design System & Design Tokens
└── public/               # Static assets & brand media
```

---

## 🎨 Design Philosophy
Auravest follows the **'Oasis' Design System**:
- **Glassmorphism**: High levels of transparency and backdrop blurs for depth.
- **Vibrant Gradients**: Deep Space Navy (`#0a0d14`) paired with Aura Gold (`#f5c842`).
- **Typography**: Specialized use of **Inter** for clarity and **JetBrains Mono** for financial values.
- **Responsiveness**: Smooth transitions from desktop analytics to mobile quick-checks.

---

<div align="center">
  <p>Built with ❤️ by the Auravest Team</p>
  <p><em>"Your money, amplified by intelligence."</em></p>
</div>
