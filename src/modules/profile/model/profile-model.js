import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  description: String,
  full_name: String,
  nationality: String,
  address: String,
  company: String,
  position: String,
  email: String,
});

export default mongoose.model('profile', schema);
