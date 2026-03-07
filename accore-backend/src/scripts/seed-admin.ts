import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from '../models/admin.model';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    
    const adminExists = await Admin.findOne({ email: 'admin@angelescity.gov.ph' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('SecurePassword123!', salt);

    const masterAdmin = new Admin({
      email: 'admin@angelescity.gov.ph',
      passwordHash,
      department: 'Engineering Command Center'
    });

    await masterAdmin.save();
    console.log('Master admin created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();