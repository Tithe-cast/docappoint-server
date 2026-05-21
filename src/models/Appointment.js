import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: { type: String, required: true },
  doctorSpecialty: { type: String },
  doctorImage: { type: String },
  hospital: { type: String },
  fee: { type: Number },
  patientName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
