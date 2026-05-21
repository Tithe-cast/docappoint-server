import { Router } from 'express';
import Review from '../models/Review.js';
import Doctor from '../models/Doctor.js';
import { verifyToken } from '../middleware/auth.js';


const router = Router();


// GET reviews for a doctor 
router.get('/:doctorId', async (req, res) => {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//POST create review 
router.post('/', verifyToken, async (req, res) => {
  try {
    const { doctorId, doctorName, userName, userPhoto, rating, comment } = req.body;


    const review = await Review.create({ doctorId, doctorName, userName, userPhoto, rating, comment });


    // Update doctor's average rating
    const allReviews = await Review.find({ doctorId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Doctor.findByIdAndUpdate(doctorId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });


    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;


