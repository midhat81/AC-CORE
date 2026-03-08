import mongoose, { Schema, Document } from 'mongoose';

export interface ICitizen extends Document {
  email: string;
  firstName: string;
  lastName: string;
  googleId?: string;
  password?: string;
  profilePicture?: string;
}

const CitizenSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  googleId: { type: String, sparse: true, unique: true },
  password: { type: String },
  profilePicture: { type: String, default: '' },
}, {
  timestamps: true 
});

export default mongoose.model<ICitizen>('Citizen', CitizenSchema);