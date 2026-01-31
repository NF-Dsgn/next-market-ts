import {NextResponse, NextRequest} from "next/server"
import connectDB from "@/app/utils/database"
import {ItemModel} from "@/app/utils/schemaModels"
import { ItemDataType, PageProps } from "@/app/types"

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

// export async function PUT(request:NextRequest, context:Context){
export async function PUT(request: NextRequest, context: PageProps) {
  // const reqBody = await request.json()

  try{
    const reqBody: ItemDataType = await request.json()
    await connectDB()

    // const params = await context.params
    const { id } = await context.params

    // const singleItem = await ItemModel.findById(params.id)
    const singleItem = await ItemModel.findById(id)
    
    if (!singleItem) {
      return NextResponse.json({ message: "アイテムが見つかりません" }, { status: 404 })
    }

    if(singleItem.email === reqBody.email){
      // await ItemModel.updateOne({_id:params.id}, reqBody)
      await ItemModel.updateOne({ _id: id }, reqBody)
      return NextResponse.json({message:"アイテム編集成功"})
    }else{
      // return NextResponse.json({message:"他の人が作成したアイテムです"})
      return NextResponse.json({ message: "他の人が作成したアイテムです" }, { status: 403 })
    }

  }catch{
    // return NextResponse.json({message:"アイテム編集失敗"})
    return NextResponse.json({ message: "アイテム編集失敗" }, { status: 500 })
  }
  
}