import {NextResponse} from "next/server"
// import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels"
import { ItemDataType, ApiResponse } from "@/app/types"

export async function GET(){
  try{
    await connectDB()
    const allItems = await ItemModel.find()
    
    const responseData: ApiResponse<ItemDataType> = {
      message: "アイテム読み取り成功（オール）",
      allItems: allItems
    }

    // return NextResponse.json({message:"アイテム読み取り成功（オール）", allItems: allItems})
    return NextResponse.json(responseData)

  }catch{
    // return NextResponse.json({message:"アイテム読み取り失敗（オール）"})
    return NextResponse.json({ message: "アイテム読み取り失敗（オール）" }, { status: 500 })
  }

}

export const revalidate = 0