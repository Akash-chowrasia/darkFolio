import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  verification_code: String,
  coaching_name:String,
  email: String,
});

schema.index({ verification_code: 1 });

export default mongoose.model('auth_verify_email', schema);
