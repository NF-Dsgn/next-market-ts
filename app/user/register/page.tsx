"use client"
import {useState} from "react"

const Register = () => {
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // console.log(name)

  // const handleSubmit = async(e) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`,{
        method:"POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:name,
          email:email,
          password:password
        })
      })
      // const jsonData = await response.json()
      const jsonData: { message: string } = await response.json()
      alert(jsonData.message)
    }catch{
      alert("ユーザー登録失敗")
    }
  }
  return(
    <div>
      <title>登録ページ</title>
      <meta name="description" content="登録ページです"/>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>

        {/* <input value={name} onChange={(e) => setName(e.target.value)}
        type="text" name="name" placeholder="名前" required /> */}
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="名前"
          required
        />

        {/* <input value={email} onChange={(e) => setEmail(e.target.value)}
        type="text" name="email" placeholder="メールアドレス" required /> */}
        <input
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          type="text"
          name="email"
          placeholder="メールアドレス"
          required
        />

        {/* <input value={password} onChange={(e) => setPassword(e.target.value)}
        type="text" name="password" placeholder="パスワード" required /> */}
        <input
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          type="text"
          name="password"
          placeholder="パスワード"
          required
        />

        <button>登録</button>
      </form>
    </div>
  )
}

export default Register