import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
  email: String,
  name: String,
  rating: String,
});

skillSchema.index({ email: 1 });

export default mongoose.model('skill_record', skillSchema);
