import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/hrModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.biscuit;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const protectBot = asyncHandler(async (req, res, next) => {

  if(!req.headers['authorization']) return next(createError.Unauthorized())

  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');

  const accessToken = bearerToken[1];

  jwt.verify(accessToken, process.env.JWT_SECRET);
  res.status(200)
  next()

});

export { protect, protectBot };