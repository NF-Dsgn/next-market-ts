import {NextResponse, NextRequest} from "next/server"
import connectDB from "@/app/utils/database"
import {ItemModel} from "@/app/utils/schemaModels"
import { ItemDataType, PageProps } from "@/app/types"

// type Context = {
//   params:{
//     id: string
//   }
// }
// type Context = {
//   params: Promise<{
//     id: string
//   }>
// }

// export async function DELETE(request:NextRequest,context:Context){
export async function DELETE(request: NextRequest, context: PageProps) {
  
  try{
    // const reqBody = await request.json()
    const reqBody: Pick<ItemDataType, "email"> = await request.json()
    await connectDB()

    // const params = await context.params
    const { id } = await context.params
    // const singleItem = await ItemModel.findById(params.id)
    const singleItem = await ItemModel.findById(id)
    
    if (!singleItem) {
      return NextResponse.json({ message: "アイテムが見つかりません" }, { status: 404 })
    }

    if(singleItem.email === reqBody.email){
      // await ItemModel.deleteOne({_id: params.id})
      await ItemModel.deleteOne({ _id: id })
      return NextResponse.json({message: "アイテム削除成功"})
    }else{
      // return NextResponse.json({message: "他の人が作成したアイテムです"})
      return NextResponse.json({ message: "他の人が作成したアイテムです" }, { status: 403 })
    }
  }catch{
    // return NextResponse.json({message: "アイテム削除失敗"})
    return NextResponse.json({ message: "アイテム削除失敗" }, { status: 500 })
  }
}