import {NextResponse, NextRequest} from "next/server"
import {SignJWT} from "jose"
import connectDB from "@/app/utils/database"
import {UserModel} from "@/app/utils/schemaModels"
import { UserDataType, ApiResponse } from "@/app/types"

export async function POST(request:NextRequest){
  // const reqBody = await request.json()
  try{
    const reqBody: UserDataType = await request.json()
    await connectDB()

    const savedUserData = await UserModel.findOne({email:reqBody.email})
    // console.log(savedUserData)

    if(savedUserData){
      if(reqBody.password === savedUserData.password){

        const secretKey = new TextEncoder().encode("next-market-app-book")
        const payload = {
          email: reqBody.email
        }
        const token = await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setExpirationTime("1d")
        .sign(secretKey)
        // console.log(token)
        
        const responseData: ApiResponse = {
          message: "ログイン成功",
          token: token
        }

        // return NextResponse.json({message:"ログイン成功", token: token})
        return NextResponse.json(responseData)
      }else{
        // return NextResponse.json({message:"ログイン失敗：パスワードが間違っています"})
        return NextResponse.json({ message: "ログイン失敗：パスワードが間違っています" }, { status: 401 })
      }
      
    }else{
      // return NextResponse.json({message:"ログイン失敗：ユーザー登録をしてください"})
      return NextResponse.json({ message: "ログイン失敗：ユーザー登録をしてください" }, { status: 401 })
    }
    
  // }catch{
  //   return NextResponse.json({message:"ログイン失敗"})
  // }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "ログイン失敗" }, { status: 500 })
  }
  
}

// セキュリティの豆知識: 実務では、あえて「パスワードが違う」のか「ユーザーが存在しない」のかを区別せずに、両方とも「メールアドレスまたはパスワードが正しくありません」という統一メッセージにすることが多いです（悪い人に「このメールアドレスは登録済みだな」と特定されないため）。

// 秘密鍵（secretKey）の管理: 今は練習用ですが、実務では "next-market-app-book" のような文字列はソースコードに直接書かず、.env ファイル（環境変数）に隠して管理します。