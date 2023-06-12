const Job = require("../models/jobModel");

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );

    return res.status(200).send({ jobs, count: jobs.length });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

exports.getJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.find({ _id: jobId, createdBy: userId });
    if (!job) throw new Error("No job id");

    return res.status(200).send(job);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError")
      return res.status(404).send(`No item found with id: ${err.value}`);
    return res.status(400).send(err);
  }
};

exports.createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);

    return res.status(201).send(job);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

exports.updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (!company || !position)
      throw new Error("Company or Position fields cannot be empty");

    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) return res.status(400).send;

    return res.status(200).send(job);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

    if (!job) throw new Error("No job with id ", jobId);

    return res.status(200).send(job);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};
