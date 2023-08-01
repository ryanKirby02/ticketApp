import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export type IUser = {
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  labels: { labelName: string; labelColor: string }[];

  //method types
  matchPassword: (enteredPassword: string) => boolean;
};

const userSchema = new Schema({
  firstName: {
    type: String,
    maxLength: [20, 'Type field first name cannot be more than 20 characters'],
  },
  lastName: {
    type: String,
    maxLength: [20, 'Type field last name cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: true,
    maxLength: [320, 'Type field email cannot be more than 320 characters'],
  },
  password: {
    type: String,
    required: true,
  },
  labels: {
    type: [
      {
        labelName: {
          type: String,
          required: true,
        },
        labelColor: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = model<IUser>('User', userSchema);

export default User;
