import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  github: {
    type: String,
    lowercase: true,
    required: true
  },
  twitter: {
    type: String,
    lowercase: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Candidate', CandidateSchema);
