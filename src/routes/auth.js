import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';


const router = Router();


const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });


// Register 
router.post('/register', async (req, res) => {
  try {
    const { name, email, photoURL, password } = req.body;


    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email, and password are required' });


    // Password validation
    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    if (!/[A-Z]/.test(password))
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });
    if (!/[a-z]/.test(password))
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter' });


    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(409).json({ message: 'An account with this email already exists' });


    const user = await User.create({ name, email, photoURL, password });
    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});


//  Login 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user || !user.password)
      return res.status(401).json({ message: 'Invalid email or password' });


    const valid = await user.comparePassword(password);
    if (!valid)
      return res.status(401).json({ message: 'Invalid email or password' });


    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


//Get current user 
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Update profile 
router.patch('/update-profile', verifyToken, async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, photoURL },
      { new: true, runValidators: true }
    );
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//Google OAuth callback 

router.get('/google/callback', async (req, res) => {
  try {
    const { googleUser } = req;
    if (!googleUser) return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);


    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      user = await User.create({
        name: googleUser.displayName,
        email: googleUser.email,
        photoURL: googleUser.photos?.[0]?.value || '',
        provider: 'google',
      });
    }


    const token = signToken(user);
    res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
});


export default router;
