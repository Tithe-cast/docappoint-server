import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  doctorId: { type: String, required: true },
  doctorName: { type: String },
  userName: { type: String, required: true },
  userPhoto: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
