import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const genToken = (id: Types.ObjectId) => {
  const secret = process.env.JWT_SECRET;

  if (secret !== undefined) {
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
  }
};

export default genToken;
