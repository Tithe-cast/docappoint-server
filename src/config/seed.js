import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';


dotenv.config();


const doctors = [
  {
    name: 'Dr. Ayesha Rahman',
    specialty: 'Cardiologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
    experience: '10 years',
    availability: ['09:00 AM - 12:00 PM', '04:00 PM - 07:00 PM'],
    description: 'Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment. Dr. Rahman has performed over 500 cardiac procedures and is known for her compassionate approach.',
    hospital: 'Labaid Cardiac Hospital',
    location: 'Dhanmondi, Dhaka',
    fee: 800,
    rating: 4.9,
  },
  {
    name: 'Dr. Karim Hossain',
    specialty: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    experience: '15 years',
    availability: ['10:00 AM - 01:00 PM', '05:00 PM - 08:00 PM'],
    description: 'Board-certified neurologist with expertise in stroke management, epilepsy, and movement disorders. Dr. Hossain trained at Johns Hopkins and brings world-class neurological care to Dhaka.',
    hospital: 'Square Hospital',
    location: 'Panthapath, Dhaka',
    fee: 1200,
    rating: 4.8,
  },
  {
    name: 'Dr. Nusrat Jahan',
    specialty: 'Pediatrician',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    experience: '8 years',
    availability: ['08:00 AM - 11:00 AM', '03:00 PM - 06:00 PM'],
    description: 'Dedicated pediatrician focused on child health, vaccination, and developmental milestones. Dr. Jahan is beloved by her young patients for her gentle and playful bedside manner.',
    hospital: "Children's Hospital",
    location: 'Mirpur, Dhaka',
    fee: 600,
    rating: 4.9,
  },
  {
    name: 'Dr. Sabbir Ahmed',
    specialty: 'Orthopedic Surgeon',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
    experience: '12 years',
    availability: ['09:00 AM - 01:00 PM', '04:00 PM - 07:00 PM'],
    description: 'Specialist in joint replacement, sports injuries, and spine surgery. Dr. Ahmed uses minimally invasive techniques to ensure faster recovery and better outcomes for his patients.',
    hospital: 'BIRDEM General Hospital',
    location: 'Shahbag, Dhaka',
    fee: 1000,
    rating: 4.7,
  },
  {
    name: 'Dr. Fatema Begum',
    specialty: 'Dermatologist',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&q=80',
    experience: '9 years',
    availability: ['11:00 AM - 02:00 PM', '05:00 PM - 08:00 PM'],
    description: 'Expert in skin conditions, cosmetic dermatology, and hair disorders. Dr. Begum combines evidence-based medicine with the latest aesthetic treatments for comprehensive skin care.',
    hospital: 'Apollo Hospital',
    location: 'Bashundhara, Dhaka',
    fee: 700,
    rating: 4.8,
  },
  {
    name: 'Dr. Mahmudul Islam',
    specialty: 'Ophthalmologist',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
    experience: '11 years',
    availability: ['08:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'],
    description: 'Specialized in cataract surgery, LASIK, and retinal diseases. Dr. Islam has restored sight to thousands of patients and is a pioneer in laser vision correction in Bangladesh.',
    hospital: 'National Eye Hospital',
    location: 'Agargaon, Dhaka',
    fee: 900,
    rating: 4.9,
  },
  {
    name: 'Dr. Rafia Sultana',
    specialty: 'Gynecologist',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80',
    experience: '14 years',
    availability: ['09:00 AM - 01:00 PM', '04:00 PM - 07:00 PM'],
    description: 'Comprehensive women\'s health specialist with expertise in high-risk pregnancies, laparoscopic surgery, and reproductive endocrinology. Dr. Sultana is passionate about empowering women\'s health.',
    hospital: 'Evercare Hospital',
    location: 'Bashundhara, Dhaka',
    fee: 1100,
    rating: 4.8,
  },
  {
    name: 'Dr. Tariq Bin Zaman',
    specialty: 'Gastroenterologist',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    experience: '7 years',
    availability: ['10:00 AM - 01:00 PM', '03:00 PM - 06:00 PM'],
    description: 'Expert in digestive disorders, liver diseases, and endoscopy. Dr. Zaman provides comprehensive care for conditions from IBS to hepatitis, using the latest diagnostic and therapeutic techniques.',
    hospital: 'United Hospital',
    location: 'Gulshan, Dhaka',
    fee: 850,
    rating: 4.7,
  },
  {
    name: 'Dr. Shahana Parvin',
    specialty: 'Endocrinologist',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    experience: '13 years',
    availability: ['08:00 AM - 11:00 AM', '02:00 PM - 05:00 PM'],
    description: 'Specialist in diabetes management, thyroid disorders, and hormonal imbalances. Dr. Parvin takes a holistic approach to endocrine health, focusing on lifestyle interventions alongside medical treatment.',
    hospital: 'BIRDEM General Hospital',
    location: 'Shahbag, Dhaka',
    fee: 950,
    rating: 4.6,
  },
];


async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');


    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');


    const result = await Doctor.insertMany(doctors);
    console.log(`✅ Seeded ${result.length} doctors successfully`);


    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}


seed();


