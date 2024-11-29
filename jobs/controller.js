import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import Job from '../models/jobModel.js';

const transporter = nodemailer.createTransport({
    host: 'mail.upliftjobs.co.zw',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply@upliftjobs.co.zw',
        pass: 'good@noreply'
    },
});


// desc    Apply for job
// route   POST /api/jobs/apply
// access  Private
const applyJob = asyncHandler(async (req, res) => {
    const { jobId, position, applicantId, firstname, lastname, sex, phone, email, resumeUrl, state} = req.body;
    const job = await Job.findById(jobId);
  
    if (job) {
      await Job.applications.create({
        applicantId,
        firstname,
        lastname,
        sex,
        phone,
        email,
        resumeUrl,
        state,
      })

    //   Email Confirmation
    await transporter.sendMail({
        from: '"UpliftJobs Zw" <no-reply@upliftjobs.co.zw>',
        to: email,
        subject: "Application received",
        text: `Your application for the ${position} position was received successfully. You can track your application status in your account dashboard.`,
        html: "<h1> UpliftJobs Zw</h1>"
    })
    
    res.status(201).json({ message: 'Application received successfully' });

    } else {
      res.status(404);
      throw new Error('Application failed');
    }
  
  });
  

  export { applyJob }