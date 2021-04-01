import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['root', 'user'],
    default: 'user',
  },

  is_email_verified: {
    type: Boolean,
    default: false,
  },

  is_deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('user_models', userSchema);
