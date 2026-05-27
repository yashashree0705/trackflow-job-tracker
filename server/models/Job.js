import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: mongoose.Schema.Types.String, required: true },
  position: { type: mongoose.Schema.Types.String, required: true },
  status: { 
    type: mongoose.Schema.Types.String, 
    enum: ['Applied', 'Interviewing', 'Accepted', 'Rejected'], 
    default: 'Applied' 
  },
  interviewDate: { type: mongoose.Schema.Types.String, default: '' }, // Phase 7 Requirement
  notes: { type: mongoose.Schema.Types.String, default: '' }          // Phase 7 Requirement
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;