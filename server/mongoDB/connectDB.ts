import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/'
    );
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    const result = (error as Error).message;
    console.log(`Mongo Error: ${result}`);
    process.exit(1);
  }
};

export default connectDB;
