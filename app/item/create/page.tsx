"use client"
import {useState} from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/app/utils/useAuth"
import { ItemDataType, ApiResponse } from "@/app/types"

// type CreateItemResponse = {
//   message: string
// }

const CreateItem = () => {
  // / useState の初期値から型推論されるので <string> は省略してもOK、あっても丁寧
  // const [title, setTitle] = useState<string>("")
  // const [price, setPrice] = useState<string>("")
  // const [image, setImage] = useState<string>("")
  // const [description, setDescription] = useState<string>("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const router = useRouter()
  const loginUserEmail = useAuth()
  // console.log(loginUserEmail)

  // const handleSubmit = async(e) => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault() 

    try{

      // JSON.stringify の中に直接書くのではなく、一度 ItemDataType 型の変数に入れることで、「必須項目（emailなど）を入れ忘れていないか」を TypeScript がチェックしてくれる。title: title を title とだけ書くのは省略記法
      const bodyData: ItemDataType = {
        title,
        price,
        image,
        description,
        email: loginUserEmail
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`,{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        // body: JSON.stringify({
        //   title: title,
        //   price: price,
        //   image: image,
        //   description: description,
        //   email: loginUserEmail,
        // }),
        body: JSON.stringify(bodyData),
      })
      // const jsonData = await response.json()
      // const jsonData: CreateItemResponse = await response.json()
      const jsonData: ApiResponse = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    // }catch{
    } catch (error) {
      alert("アイテム作成失敗")
    }
  }

  if(loginUserEmail){
    return(
      <div>
        {/* Next.jsでは title/meta は通常 layout や Metadata で管理する。これは古い書き方だが一旦このまま */}
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