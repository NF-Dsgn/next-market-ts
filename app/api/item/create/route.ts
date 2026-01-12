// import {NextResponse} from "next/server"
import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

// export async function POST(request){
export async function POST(request: NextRequest) {

  const reqBody = await request.json()
  // console.log(reqBody)

  try{
    // console.log(await request.json())
    await connectDB()
    await ItemModel.create(reqBody)
    return NextResponse.json({message:"アイテム作成成功"})
  }catch{
    return NextResponse.json({message:"アイテム作成失敗"})
  }

}


