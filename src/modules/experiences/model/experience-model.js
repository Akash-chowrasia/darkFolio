import mongoose from 'mongoose';

const experienceSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: String,
  company: String,
  start_date: String,
  end_date: String,
  description: String,
});

experienceSchema.index({ email: 1 });

export default mongoose.model('experiences', experienceSchema);
