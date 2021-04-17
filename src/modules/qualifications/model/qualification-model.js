import mongoose from 'mongoose';

const qualificationSchema = mongoose.Schema({
  email: String,
  education_type: String,
  institute_name: String,
  start_year: String,
  end_year: String,
  location: String,
  score: String,
});

qualificationSchema.index({ email: 1 });

export default mongoose.model('qualification_record', qualificationSchema);
