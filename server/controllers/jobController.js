import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Operational failure pulling cached target metrics' });
  }
};

export const createJob = async (req, res) => {
  const { company, position, status } = req.body;
  if (!company || !position) {
    return res.status(400).json({ message: 'All target entries require structural identity names' });
  }
  try {
    const job = await Job.create({ user: req.user._id, company, position, status });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to write target entity to cluster vector' });
  }
};