import axios from 'axios';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Org from '../models/orgModel.js';


// @desc    Get jobs
// @route   GET /api/jobs
// @access  Private
const getJob = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const jobs = await Job.find({ owner: decoded.userId}).select('-_id')

  res.status(200).json(jobs)
})

// @desc    Get jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
    let token;
  
    token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const jobs = await Job.find({ owner: decoded.userId}).select('-_id')
  
    res.status(200).json(jobs)
  })

// @desc    Set job
// @route   POST /api/jobs
// @access  Private
const postJob = asyncHandler(async (req, res) => {
  if (!req.body.organisationId) {
    res.status(400)
    throw new Error('Server can not detect Organisation')
  }

  const job = await Job.create({
    organisationId: req.body.organisationId,
    organisation: req.body.organisation,
    position: req.body.position,
    category: req.body.category,
    contract: req.body.contract,
    location: req.body.location,
    requirements: req.body.requirements
  })

  res.status(200).json(job)
})

// @desc    Modify job
// @route   PUT /api/jobs/:id
// @access  Private
const modifyJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  // Check for Owner
  if (!req.owner) {
    res.status(401)
    throw new Error('Owner not found')
  }

  // Make sure the logged in user matches the job user
  if (job.owner.toString() !== req.owner.id) {
    res.status(401)
    throw new Error('Owner not authorized')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedJob)
})

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  // Check for user
  if (!req.owner) {
    res.status(401)
    throw new Error('Owner not found')
  }

  // Make sure the logged in user matches the job user
  if (job.owner.toString() !== req.owner.id) {
    res.status(401)
    throw new Error('Owner not authorized')
  }

  await job.remove()

  res.status(200).json({ id: req.params.id })
})

// @desc    Get Applications
// @route   GET /api/hr/jobs/applicants
// @access  Private
const getApplications = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(token) {
  const job = await Job.findById({ owner: decoded.userId}, req.params.id)

  res.status(200).json(job.applications)
}
})

// @desc    Read Job Stats
// @route   READ /api/hr/jobs/statistics
// @access  Private
const getStats = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(token) {
  const job = await Job.findById({ owner: decoded.userId}, req.params.id)

  res.status(200).json(job.views)
}
})

// @desc    SMS
// @route   READ /api/sms/
// @access  Private

const sms = asyncHandler(async (req, res) => {
  let token;
  
  token = req.cookies.hrJwt;  
  const decoded = hrJwt.verify(token, process.env.JWT_SECRET);
  const {orgId, applicant, text} = req.body

  const org = await Org.findById({ orgId: decoded.orgId})

  if(token && org.sms.balance > 0) {

      
  }
} )

export {
    getJob,
    getJobs,
    postJob,
    modifyJob,
    deleteJob,
    getApplications,
    getStats,
    sms
}