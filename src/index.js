import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';


// Routes
import authRoutes from './routes/auth.js';
import doctorRoutes from './routes/doctors.js';
import appointmentRoutes from './routes/appointments.js';
import reviewRoutes from './routes/reviews.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware 
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
   'https://docappoint-client-virid.vercel.app',

  ],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


//Routes 
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/reviews', reviewRoutes);


//Health check 
app.get('/', (req, res) => {
  res.json({
    message: '🩺 DocAppoint API is running',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});


//404 handler 
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});


//Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});


//Start server 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
