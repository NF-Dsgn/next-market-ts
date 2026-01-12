import mongoose from "mongoose"

const connectDB = async() => {
  try{
    await mongoose.connect("mongodb+srv://nf2:pass2pass2pass2@next-market.av7hj.mongodb.net/NextAppDataBase?appName=next-market")
    console.log("Success: Connected to MongoDB")
  }catch{
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB