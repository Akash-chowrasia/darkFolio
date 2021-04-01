import mongoose from 'mongoose';

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  rating: String,
});

export default mongoose.model('skill_record', schema);
