import mongoose from 'mongoose';

const forgotPasswordSchema = new mongoose.Schema({
  token: String,
  coaching_name: String,
  email: String,
});

forgotPasswordSchema.index({ token: 1 });

export default mongoose.model('auth_forgot_password', forgotPasswordSchema);
