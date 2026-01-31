import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/app/utils/database"
import { UserModel } from "@/app/utils/schemaModels"
import { UserDataType } from "@/app/types"

export async function POST(request: NextRequest){
    // const reqBody = await request.json()

    try{
        const reqBody: UserDataType = await request.json()
        await connectDB()
        await UserModel.create(reqBody)

        // return NextResponse.json({message: "ユーザー登録成功"})
        return NextResponse.json({ message: "ユーザー登録成功" }, { status: 201 })
    // }catch{
    } catch (error: any) {

        // MongoDBのコード 11000 は「重複エラー」
        if (error.code === 11000) {
        return NextResponse.json({ message: "このメールアドレスは既に登録されています" }, { status: 400 })
        }

        // return NextResponse.json({message: "ユーザー登録失敗"})
        return NextResponse.json({ message: "ユーザー登録失敗" }, { status: 500 })
    }
}