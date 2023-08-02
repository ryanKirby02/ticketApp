import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../mongoDB/schemas/userSchema.ts';
import genToken from '../utils/genToken.ts';

const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: 'success',
      user: user,
      token: genToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid login, please try again.');
  }
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const userCheck = await User.findOne({ email: email });

  if (userCheck) {
    res.status(401);
    throw new Error(
      `There is already an account with the email ${email}. please login instead.`
    );
  }

  const user = await new User({
    firstName,
    lastName,
    email,
    password,
  }).save();

  if (user) {
    res.status(201).json({
      status: 'success',
      user: user,
      token: genToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error('Internal server error... please try again later.');
  }
});

export { authUser, registerUser };
