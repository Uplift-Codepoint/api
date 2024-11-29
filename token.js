import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router();

const tokena = asyncHandler(async (req, res) => {
    const token = jwt.sign({foo: "UpliftJobs"}, "good@biz", {
        expiresIn: '365d',
      });
      console.log(token);
      res.json(token)
})


router.route('/').get(tokena);

export default router;