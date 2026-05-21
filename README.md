# DocAppoint Server – REST API

Express.js + MongoDB backend for the DocAppoint Doctor Appointment Manager.

DocAppoint is a modern doctor appointment booking platform built with React 18, Vite, and Tailwind CSS. Users can browse top-rated doctors, view detailed profiles, and book appointments seamlessly. The app features JWT-based secure authentication with Google OAuth support, a fully responsive design with dark/light theme toggle, and a personal dashboard where patients can manage their bookings and profile. Key highlights include a Swiper.js hero slider, real-time doctor search and sorting, instant booking management (update/delete without reload), a patient review system, and a custom 404 page — all powered by a clean, professional UI with smooth animations.

## 📡 API Endpoints

### Auth
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login, returns JWT |
| GET | `/auth/me` | JWT | Get current user |
| PATCH | `/auth/update-profile` | JWT | Update name & photo |

### Doctors
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/doctors` | No | List all doctors (supports `?sort=rating&limit=3&search=`) |
| GET | `/doctors/:id` | No | Get single doctor |

### Appointments
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/appointments?email=` | JWT | Get user's appointments |
| POST | `/appointments` | JWT | Book an appointment |
| PATCH | `/appointments/:id` | JWT | Update appointment |
| DELETE | `/appointments/:id` | JWT | Delete appointment |

### Reviews
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/reviews/:doctorId` | No | Get doctor reviews |
| POST | `/reviews` | JWT | Submit a review |

## 🔐 Security

- JWT tokens expire in 7 days
- Passwords hashed with bcrypt (12 rounds)
- Users can only access/modify their own appointments
- Input validation on all routes
