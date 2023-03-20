import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  mongoose.set("strictQuery", false);
  const db = await mongoose.connect(process.env.Mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connection[0];
}

export default dbConnect;
