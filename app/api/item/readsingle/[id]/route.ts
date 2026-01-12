// import {NextResponse} from "next/server"
import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"

// type Context = {
//   params: {
//     id: string
//   }
// }
type Context = {
  params: Promise<{
    id: string
  }>
}

// export async function GET(request,context){
export async function GET(
  _request: NextRequest,
  context: Context
) {
  try{
    await connectDB()
    const params = await context.params
    const singleItem = await ItemModel.findById(params.id)
    return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
  }catch{
    return NextResponse.json({message: "アイテム読み取り失敗（シングル）"})
  }
  
}