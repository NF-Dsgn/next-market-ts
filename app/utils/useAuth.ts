import { useState, useEffect } from "react" 
import {useRouter} from "next/navigation"
import { jwtVerify } from "jose"
import type { JWTPayload } from "jose" //tsで追加

type JwtPayloadWithEmail = JWTPayload & {
  email?: string
} // ジェネリクスで payload の型を上書き

// const useAuth = () => {
const useAuth = (): string => {
  // const [loginUserEmail, setLoginUserEmail] = useState("")
  const [loginUserEmail, setLoginUserEmail] = useState<string>("")
  const router = useRouter()

  useEffect(()=>{
    // const checkToken = async() => {
    const checkToken = async (): Promise<void> => {
      const token = localStorage.getItem("token")
      if(!token){
        router.push("/user/login")
        return //tsで追加
      }
      try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        // const decodedJwt = await jwtVerify(token, secretKey)
        const decodedJwt = await jwtVerify<JwtPayloadWithEmail>(
          token,
          secretKey
        )
        // setLoginUserEmail(decodedJwt.payload.email)
        if (decodedJwt.payload.email) {
          setLoginUserEmail(decodedJwt.payload.email)
        } else {
          router.push("/user/login")
        }
      }catch{
        router.push("/user/login")
      }
    }
    checkToken()
  },[router])
  return loginUserEmail
}

export default useAuth