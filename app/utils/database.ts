import mongoose from "mongoose"

// const connectDB = async() => {
//   try{
//     await mongoose.connect("mongodb+srv://nf2:pass2pass2pass2@next-market.av7hj.mongodb.net/NextAppDataBase?appName=next-market")
//     console.log("Success: Connected to MongoDB")
//   }catch{
//     console.log("Failure: Unconnected to MongoDB")
//     throw new Error()
//   }
// }

const connectDB = async (): Promise<void> => {
  // すでに接続済みの場合は、新たに接続しない（Next.jsのホットリロード対策）
  if (mongoose.connections[0].readyState) {
    return
  }

  try {
    // 環境変数を使用して、パスワードなどの機密情報を隠す
    // const mongoUrl = process.env.MONGODB_URL
    const mongoUrl = "mongodb+srv://nf2:pass2pass2pass2@next-market.av7hj.mongodb.net/NextAppDataBase?appName=next-market"
    
    if (!mongoUrl) {
      throw new Error("環境変数 MONGODB_URL が設定されていません")
    }

    await mongoose.connect(mongoUrl)
    console.log("Success: Connected to MongoDB")
  } catch (error) {
    console.log("Failure: Unconnected to MongoDB")
    throw new Error("データベース接続に失敗しました")
  }
}


export default connectDB