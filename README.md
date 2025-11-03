<p align="center">
  <a href="https://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<h1 align="center">📘 API Presensi — NestJS + Prisma + JWT Auth</h1>

<p align="center">
  RESTful API untuk sistem presensi berbasis <b>NestJS</b>, dilengkapi autentikasi JWT dan koneksi database menggunakan <b>Prisma ORM</b>.
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript" />
  </a>
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs" alt="NestJS" />
  </a>
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma" />
  </a>
  <a href="https://jwt.io/" target="_blank">
    <img src="https://img.shields.io/badge/Auth-JWT-green?logo=jsonwebtokens" alt="JWT" />
  </a>
</p>

---

## 🚀 Deskripsi

Proyek ini adalah **REST API Presensi** yang dibangun menggunakan **NestJS**.  
Fitur utama meliputi:

- 🔐 Autentikasi menggunakan **JWT (JSON Web Token)**
- 🧑‍💼 Manajemen pengguna (login, register, role-based access)
- 🕒 Pencatatan dan validasi presensi
- 🧩 Integrasi database menggunakan **Prisma ORM**
- 🧱 Arsitektur modular (Auth, Users, Presensi, dsb.)

---

## 🛠️ Tech Stack

| Teknologi | Deskripsi |
|------------|------------|
| **NestJS** | Backend framework berbasis Node.js |
| **Prisma** | ORM untuk database SQL (MySQL, PostgreSQL, dsb.) |
| **Passport + JWT** | Autentikasi dan otorisasi |
| **TypeScript** | Bahasa utama |
| **Dotenv** | Manajemen environment variables |

---

## 📂 Struktur Proyek

src/
├── auth/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── jwt.strategy.ts
│ └── jwt-auth.guard.ts
├── users/
│ ├── users.controller.ts
│ ├── users.service.ts
│ └── users.module.ts
├── prisma/
│ └── prisma.service.ts
├── main.ts
└── app.module.ts


---

## 🖼️ API Overview

| Endpoint | Description | Example Image |
|-----------|--------------|----------------|
| `/auth/login` | User login with JWT | ![Login](public/login.png) |
| `/user/create` | Create new user | ![Create User](public/createUser.png) |
| `/user/update/:id` | Update existing user | ![Update User](public/updateUser.png) |
| `/user/delete/:id` | Delete user | ![Delete User](public/deleteUser.png) |
| `/user/all` | Get all users | ![Get All Users](public/getAllUser.png) |
| `/user/:id` | Get user by ID | ![Get ID User](public/getIdUser.png) |
| `/attendance` | Record attendance | ![Attendance](public/attendance.png) |
| `/attendance/history/:userId` | View attendance history | ![History](public/history.png) |
| `/attendance/summary/:userId` | Monthly attendance summary | ![Summary](public/summary.png) |
| `/attendance/analysis` | Attendance analytics | ![Analysis](public/analys.png) |

---