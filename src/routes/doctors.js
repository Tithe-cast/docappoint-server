import { Router } from 'express';
import Doctor from '../models/Doctor.js';

const router = Router();

//  GET all doctors (with optional sort/search/limit) 
router.get('/', async (req, res) => {
  try {
    const { sort, limit, search } = req.query;
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
      ];
    }

    let dbQuery = Doctor.find(query);
    if (sort === 'rating') dbQuery = dbQuery.sort({ rating: -1 });
    if (limit) dbQuery = dbQuery.limit(parseInt(limit));

    const doctors = await dbQuery;
    res.json({ doctors, total: doctors.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single doctor 
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
