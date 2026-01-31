"use client"
import {useState} from "react"
import { UserDataType, ApiResponse } from "@/app/types"

// type LoginResponse = {
//   message: string
//   token: string
// }

const Login = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // const handleSubmit = async(e) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try{
      
      const bodyData: UserDataType = {
        email,
        password
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        // body: JSON.stringify({
        //   email:email,
        //   password:password
        // })
        body: JSON.stringify(bodyData)
      })
      // const jsonData = await response.json()
      // const jsonData: { message: string; token: string } = await response.json()
      // const jsonData: LoginResponse = await response.json()
      const jsonData: ApiResponse = await response.json()
      // console.log(jsonData)
      // localStorage.setItem("token", jsonData.token)
      if (jsonData.token) { //token をあるかもしれないし、ないかもしれない（任意）として定義したから
        localStorage.setItem("token", jsonData.token)
      }
      alert(jsonData.message)
    }catch{
      alert("ログイン失敗")
    }
  }
  return(
    <div>
      <title>ログインページ</title>
      <meta name="description" content="ログインページです"/>

      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        {/* <input value={email} onChange={(e) => setEmail(e.target.value)}
        type="text" name="email" placeholder="メールアドレス" required/> */}
        <input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="メールアドレス"
          required
        />
        {/* <input value={password} onChange={(e) => setPassword(e.target.value)}
        type="text" name="password" placeholder="パスワード" required/> */}
        <input
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  )
}

export default Login