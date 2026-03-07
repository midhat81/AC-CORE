import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  try {
    cloudinary.config({
      url: process.env.CLOUDINARY_URL,
    });
    console.log('Cloudinary Connected successfully.');
  } catch (error: any) {
    console.error(`Cloudinary Configuration Error: ${error.message}`);
  }
};

export default connectCloudinary;