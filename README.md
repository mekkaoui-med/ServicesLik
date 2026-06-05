# ServicesLik

A modern, responsive web application to discover **coworking spaces, shared offices, work-friendly cafés, startup hubs, libraries, and meeting rooms** across Morocco.

> ⚠️ Frontend-only project — no backend. Uses mock data and a fake authentication system based on `localStorage`.

---

## ✨ Features

- 🏠 **Home page** with hero section, category browsing, and featured workspaces
- 🔍 **Explore page** with advanced filters (city, category, price range, rating)
- 📄 **Workspace details** page with image gallery and booking flow
- ❤️ **Favorites** — save workspaces you like (persisted in localStorage)
- 📅 **Bookings** — mock booking system with history
- 👤 **Profile** page for the logged-in user
- 🔐 **Fake authentication** with protected routes
- 🌗 **Dark / Light mode** toggle
- 📱 **Fully responsive** UI with smooth animations (Framer Motion)

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **TanStack Start** (file-based routing via TanStack Router)
- **Vite 7** as the build tool
- **Tailwind CSS v4** with semantic design tokens (OKLCH colors)
- **shadcn/ui** components
- **Framer Motion** for animations
- **React Icons** (Feather icons)
- **LocalStorage** for persistence (auth, favorites, bookings)

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh) (or Node.js 20+)

### Installation

```bash
# Install dependencies
bun install

# Start the dev server
bun dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
bun run build
```

---

## 🔑 Demo Credentials

Use these credentials on the **Login** page to access protected routes (Favorites, Bookings, Profile):

```
Email:    demo@serviceslik.com
Password: 123456
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components (Navbar, Footer, WorkspaceCard, SearchBar, ProtectedRoute)
│   └── ui/            # shadcn/ui primitives
├── context/           # React contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── data/
│   └── workspaces.ts  # Mock workspace data (20 entries)
├── lib/
│   └── storage.ts     # LocalStorage helpers (favorites, bookings)
├── routes/            # File-based routes (TanStack Router)
│   ├── __root.tsx
│   ├── index.tsx          # /
│   ├── explore.tsx        # /explore
│   ├── workspace.$id.tsx  # /workspace/:id
│   ├── login.tsx          # /login
│   ├── favorites.tsx      # /favorites  (protected)
│   ├── bookings.tsx       # /bookings   (protected)
│   └── profile.tsx        # /profile    (protected)
├── styles.css         # Tailwind + design tokens
└── router.tsx
```

---

## 🎨 Design System

All colors, gradients, and shadows are defined as semantic tokens in `src/styles.css` using the OKLCH color space. Components use Tailwind utility classes mapped to these tokens — no hardcoded colors in components.

---

## 📜 License

This project is for educational/demo purposes.
