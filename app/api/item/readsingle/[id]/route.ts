// import {NextResponse} from "next/server"
import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { ItemDataType, ApiResponse, PageProps } from "@/app/types"

// type Context = {
//   params: {
//     id: string
//   }
// }
// type Context = {
//   params: Promise<{
//     id: string
//   }>
// }

// export async function GET(request,context){
export async function GET(
  _request: NextRequest,
  context: PageProps
) {
  try{
    await connectDB()
    // const params = await context.params
    const { id } = await context.params
    // const singleItem = await ItemModel.findById(params.id)
    const singleItem = await ItemModel.findById(id)
    
    if (!singleItem) {
      return NextResponse.json({ message: "アイテムが存在しません" }, { status: 404 })
    }
    
    const responseData: ApiResponse<ItemDataType> = {
      message: "アイテム読み取り成功（シングル）",
      singleItem: singleItem
    }

    // return NextResponse.json({message: "アイテム読み取り成功（シングル）", singleItem: singleItem})
    return NextResponse.json(responseData)
  }catch{
    // return NextResponse.json({message: "アイテム読み取り失敗（シングル）"})
    return NextResponse.json({ message: "アイテム読み取り失敗（シングル）" }, { status: 500 })
  }
  
}