import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  company: String,
  start_date: String,
  end_date: String,
  description: String,
});

export default mongoose.model('experiences', schema);
