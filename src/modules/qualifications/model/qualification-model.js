import mongoose from 'mongoose';

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  education_type: String,
  institute_name: String,
  start_year: String,
  end_year: String,
  location: String,
  score: String,
});

export default mongoose.model('qualification_record', schema);
