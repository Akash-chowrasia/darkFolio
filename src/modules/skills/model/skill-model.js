import mongoose from 'mongoose';

const schema = mongoose.Schema({
  name: String,
  rating: String,
});

export default mongoose.model('skill_record', schema);
