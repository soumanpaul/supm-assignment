import mongoose from 'mongoose';


const username = "Sam1729Paul";
const password = "xG1QPYC7xm11m3sI";
const cluster = "cluster0";
const dbname = "Test2023";

const connectDB = async () => {
  try {
    console.log("URL...",process.env.MONGO_URL)
    const conn = await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.qhlvw.mongodb.net/${dbname}?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
