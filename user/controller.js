import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utilities/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      email: user.email,
      verification: user.verification,
      subscription: user.subscription,
      savedJobs: user.savedJobs,
      appliedJobs: user.appliedJobs,
      resumeURL: user.resumeURL,
      resumeInfo: user.resumeInfo,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Sign In with Google
// @route   POST /user/auth/google
// @access  Private
const googleAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      email: user.email,
      verification: user.verification,
      subscription: user.subscription,
      savedJobs: user.savedJobs,
      appliedJobs: user.appliedJobs,
      resumeURL: user.resumeURL,
      resumeInfo: user.resumeInfo,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Sign In with Facebook
// @route   POST /user/auth/facebook
// @access  Private
const facebookAuth = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      email: user.email,
      verification: user.verification,
      subscription: user.subscription,
      savedJobs: user.savedJobs,
      appliedJobs: user.appliedJobs,
      resumeURL: user.resumeURL,
      resumeInfo: user.resumeInfo,
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const signUpUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, phone, email, password, verification, subscription } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    role,
    firstname,
    lastname,
    phone,
    email,
    password,
    verification,
    subscription,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      role: user.role,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      verification: user.verification,
      subscription: user.subscription,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const signOutUser = (req, res) => {
  res.cookie('biscuit', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserInfo  = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Save Job to Account
// @route   POST /api/users/savejob
// @access  Private
const saveJob = asyncHandler(async (req, res) => {
  const { jobId, position, organisation} = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    await User.savedJobs.create({
      jobId,
      position,
      organisation
    })

    res.status(201).json({ message: 'Job successfully saved' });

  } else {
    res.status(404);
    throw new Error('Unable to save job, user not found');
  }

});

// @desc    Get saved jobs
// @route   GET /api/users/savedjobs
// @access  Private

const savedJobs = asyncHandler(async (req, res) => {
  let token;

  token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const savedJobs = await User.find({ _id: decoded.userId}).select('savedJobs')

  res.status(200).json(savedJobs)
})

// desc    Save job
// route   POST /api/jobs/save
// access  Private
const applications = asyncHandler(async (req, res) => {
    const { jobId, applicantId, firstname, lastname, phone, email, resumeURL, state} = req.body;
    const job = await Job.findById(jobId);
  
    if (job) {
      await Job.applications.create({
        applicantId,
        firstname,
        lastname,
        phone,
        email,
        resumeURL,
        state,
      })
  
      res.status(201).json({ message: 'Application received successfully' });
  
    } else {
      res.status(404);
      throw new Error('Application failed');
    }
  
  });


export {
  signUpUser,
  signInUser,
  signOutUser,
  googleAuth,
  facebookAuth,
  getUserInfo,
  updateUserInfo,
  saveJob,
  savedJobs,
  applications
}

