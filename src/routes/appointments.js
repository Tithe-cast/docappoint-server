import { Router } from 'express';
import Appointment from '../models/Appointment.js';
import { verifyToken } from '../middleware/auth.js';


const router = Router();


// ── GET appointments by user email ────────────────────────
router.get('/', verifyToken, async (req, res) => {
  try {
    const { email } = req.query;
   
    // Security: ensure user can only access their own appointments
    if (email !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }


    const appointments = await Appointment.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── POST create appointment ───────────────────────────────
router.post('/', verifyToken, async (req, res) => {
  try {
    const data = req.body;
   
    // Validate date is not in the past
    const appointmentDate = new Date(data.appointmentDate);
    if (appointmentDate < new Date().setHours(0,0,0,0)) {
      return res.status(400).json({ message: 'Appointment date cannot be in the past' });
    }


    const appointment = await Appointment.create({
      ...data,
      userEmail: req.user.email, // Use JWT email (not form input) for security
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── PATCH update appointment ──────────────────────────────
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });


    // Security: only owner can update
    if (appointment.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }


    const { patientName, gender, phone, appointmentDate, appointmentTime } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { patientName, gender, phone, appointmentDate, appointmentTime },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ── DELETE appointment ────────────────────────────────────
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });


    // Security: only owner can delete
    if (appointment.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }


    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
