import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  image: { type: String, required: true },
  experience: { type: String, required: true },
  availability: [String],
  description: { type: String },
  hospital: { type: String },
  location: { type: String },
  fee: { type: Number, required: true },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);
