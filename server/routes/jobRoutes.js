import express from 'express';
import { getJobs, createJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import Job from '../models/Job.js';

const router = express.Router();

router.route('/')
  .get(protect, getJobs)
  .post(protect, createJob);

router.route('/:id')
  .put(protect, async (req, res) => {
    try {
      const { company, position, status, interviewDate, notes } = req.body;
      
      const updatedJob = await Job.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id }, 
        { company, position, status, interviewDate, notes },
        { new: true, runValidators: true }
      );

      if (!updatedJob) {
        return res.status(404).json({ success: false, message: 'Tracked job asset entry not found.' });
      }

      return res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  })
  .delete(protect, async (req, res) => {
    try {
      const deletedJob = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
      if (!deletedJob) {
        return res.status(404).json({ success: false, message: 'Asset entry target not found.' });
      }
      return res.status(200).json({ success: true, message: 'Job entry purged successfully.' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

export default router;