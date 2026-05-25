# Car Rental Website 🚗

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

A comprehensive online car rental platform featuring an elegant landing page, booking system, and powerful admin dashboard.

🌍 **Live Demo:** [https://imran-car-rental.vercel.app](https://imran-car-rental.vercel.app)

---

## Features

- **Online Booking System** – Seamless vehicle reservation process for customers.
- **Admin Dashboard** – Powerful backend to manage the fleet, bookings, and users.
- **Responsive Design** – Beautiful, mobile-friendly UI built with Tailwind CSS.
- **Fast Performance** – Powered by Vite and React for ultra-fast load times.
- **Secure Database & Auth** – Integrated with Firebase for secure data handling.
- **Deployment Ready** – Includes configuration for Vercel deployment.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend/Database:** Firebase (Database, Auth, Storage)
- **Routing:** React Router DOM (Assumed)
- **Hosting:** Vercel

---

## Quick Start

### Prerequisites

- Node.js 16+
- Firebase project (for Database and Authentication)

### Installations

**Clone the repository**
```bash
git clone https://github.com/MuteeStack/Car-Rental-Website-with-Admin-Dasboard-and-Online-Booking.git
```

**Install Dependencies**
```bash
cd car-landing
npm install
```

**Environment setup**
Create a `.env.local` file inside the `car-landing` folder and add your Firebase configurations:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

**Development**
```bash
# Run frontend
npm run dev
```

**Production Build**
```bash
npm run build
```

## Repository Structure

```text
/My-App
├── /src
│   ├── /assets            # Images and static assets
│   ├── /components        # Reusable UI components (Navbar, Footer, Modal, etc.)
│   ├── /constants         # Configuration constants
│   ├── /pages             # App pages (Home, About, Booking)
│   ├── App.jsx            # Main app routing
│   ├── firebase.js        # Firebase initialization configuration
│   └── main.jsx           # React entry point
├── public/                # Public assets
├── tailwind.config.js     # Tailwind CSS settings
├── vite.config.js         # Vite configuration
└── package.json           # Project dependencies and scripts
```

## Contributing
We welcome contributions from developers who want to improve this platform!

1. Fork the Repository
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
