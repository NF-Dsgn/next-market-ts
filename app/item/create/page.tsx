"use client"
import {useState} from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/app/utils/useAuth"

type CreateItemResponse = {
  message: string
}

const CreateItem = () => {
  // const [title, setTitle] = useState("")
  // const [price, setPrice] = useState("")
  // const [image, setImage] = useState("")
  // const [description, setDescription] = useState("")
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const router = useRouter()
  const loginUserEmail = useAuth()
  // console.log(loginUserEmail)

  // const handleSubmit = async(e) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault() 

    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`,{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail,
        }),
      })
      // const jsonData = await response.json()
      const jsonData: CreateItemResponse = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    }catch{
      alert("アイテム作成失敗")
    }
  }

  if(loginUserEmail){
    return(
      <div>
        <title>作成ページ</title>
        <meta name="description" content="作成ページです"/>
        <h1 className="page-title">アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
          <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
          <button type="submit">作成</button>
        </form>
      </div>
    )
  }
}

export default CreateItem