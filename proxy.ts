import {NextResponse, NextRequest} from "next/server"
import { jwtVerify } from "jose"

export async function proxy(request:NextRequest){
  // console.log("ミドルウェア")
  // const token = await request.headers.get("Authorization")?.split(" ")[1]
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5mMzNAZ21haWwuY29tIiwiZXhwIjoxNzY4MjczMzUxfQ.XctHTJPMa-R0PWkumMpR3KD2MI3Dc-rnZOmZGM-ZLKM"
  if(!token){
    return NextResponse.json({message: "トークンがありません"})
  }

  try{
    const secretKey = new TextEncoder().encode("next-market-app-book")
    const decodedJwt = await jwtVerify(token, secretKey)
    // console.log("decodedJwt:", decodedJwt)
    return NextResponse.next()
  }catch{
    return NextResponse.json({message: "トークンが正しくないので、ログインしてください"})
  }
  
}

export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
}