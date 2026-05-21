
**Live Link:** https://docappoint-server-dl42.onrender.com

# DocAppoint Server – REST API
DocAppoint API is a secure and scalable REST API built with Node.js, Express.js, and MongoDB (Mongoose). It handles user authentication using JWT tokens with bcrypt password hashing, full CRUD operations for appointments with owner-level authorization, doctor listings with search and sort support, and a patient review system that automatically updates doctor ratings. The API includes protected routes via JWT middleware, global error handling, CORS configuration for cross-origin requests, and a database seed script with 9 demo doctors across Dhaka hospitals.
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
