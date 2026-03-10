import mongoose, { Schema, Document } from 'mongoose';

export interface IBarangay extends Document {
  name: string;
  location: {
    type: string;
    coordinates: number[];
  };
}

const BarangaySchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

BarangaySchema.index({ location: '2dsphere' });

export default mongoose.model<IBarangay>('Barangay', BarangaySchema);