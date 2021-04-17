import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  name: String,
  description: String,
  full_name: String,
  nationality: String,
  address: String,
  company: String,
  position: String,
  email: String,
});

profileSchema.index({ email: 1 });

export default mongoose.model('profile', profileSchema);
