# 🐾 PawTrack

> AI-powered pet health tracker for cats & dogs

PawTrack helps pet owners track feeding, medical events, activity and get AI-powered insights — all in one place, instead of scattered notes on your phone.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

---

## ✨ Features

- 🐱 **Pet Profiles** — manage multiple cats and dogs with photos
- 🍽️ **Feeding Tracker** — log daily meals, track food stock, get low-stock reminders
- 💊 **Medical Journal** — vaccines, medications, tick treatments, grooming, dental care, analyses
- 🏃 **Activity Log** — track walks, play sessions and daily activity
- 💛 **Health Score** — daily wellness score based on feeding, activity and medication
- 🤖 **AI Insights** — preset AI prompts for symptom check and care advice (Free tier)
- 💬 **AI Chat** — open-ended chat with AI assistant (Pro tier)
- 📄 **Vet Visit Report** — auto-generated PDF summary for vet appointments (Pro tier)
- 🔔 **Smart Reminders** — contextual notifications for upcoming events
- 🌍 **Multilingual** — Ukrainian & English

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Plus Jakarta Sans |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage) |
| AI | Claude API (Anthropic) |
| i18n | next-intl |
| Deploy | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account
- Anthropic API key (for AI features)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/pawtrack.git
cd pawtrack
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Fill in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard
│   ├── pets/[id]/          # Pet profile & logs
│   └── settings/           # User settings
├── components/
│   ├── ui/                 # Design system components
│   └── features/           # Feature-specific components
├── hooks/                  # Custom React hooks
├── lib/
│   └── supabase/           # Supabase client (server + client)
├── types/                  # TypeScript types
└── styles/                 # Global styles
```

---

## 🗄️ Database Schema

```
users · pets · feeding_logs · food_stock
medical_events · activity_logs
prompt_templates · ai_cache · ai_usage
```

---

## 📋 Roadmap

- [x] Project setup & Supabase connection
- [x] Database schema
- [ ] i18n (Ukrainian + English)
- [ ] Pet profiles CRUD + photo upload
- [ ] Feeding tracker
- [ ] Medical journal
- [ ] Activity log + Health Score
- [ ] Auth (email + Google)
- [ ] Free / Pro subscription logic
- [ ] AI preset prompts
- [ ] AI chat (Pro)
- [ ] Vet Visit PDF (Pro)
- [ ] Vercel deployment

---

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome via Issues.

---

## 📄 License

MIT

---

<p align="center">Built with ❤️ and lots of ☕ for all pet lovers 🐾</p>
You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
