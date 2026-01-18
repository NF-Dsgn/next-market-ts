"use client"
import {useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import useAuth from "@/app/utils/useAuth"

type UpdateItemResponse = {
  message: string
}
type Item = {
  _id: string
  image: string
  price: string
  title: string
  description: string
  email: string
}
type ReadSingleItemResponse = {
  message: string
  singleItem: Item
}
// type PageProps = {
//   params: Promise<{
//     id: string
//   }>
// }
// ※ params が Promise になるのは Server Component の async page の文脈
// Client Component では不要?
type PageProps = {
  params: {
    id: string
  }
}


// const UpdateItem = (context) => {
const UpdateItem = ({ params }: PageProps) => {
  const [title, setTitle] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const loginUserEmail = useAuth()

  useEffect(() => {
    // const getSingleItem = async () => {
    const getSingleItem = async (): Promise<void> => {
      // const params = await context.params
      const resolvedParams = await params
      // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`, {cache:"no-store"})
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${resolvedParams.id}`,
        { cache: "no-store" }
      )
      const jsonData: ReadSingleItemResponse = await response.json()
      const singleItem = jsonData.singleItem
      
      setTitle(singleItem.title)
      setPrice(singleItem.price)
      setImage(singleItem.image)
      setDescription(singleItem.description)
      setEmail(singleItem.email)
      setLoading(true)

    }
    getSingleItem()
  // }, [context])
  }, [params])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault() 
    // const params = await context.params
    const resolvedParams = await params
    try{
      // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`,{
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${resolvedParams.id}`,{
        method: "PUT",
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
      const jsonData: UpdateItemResponse = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    }catch{
      alert("アイテム編集失敗")
    }
  }

  if(loading){
    if(loginUserEmail === email){
      return(
        <div>
          <title>編集ページ</title>
          <meta name="description" content="編集ページです"/>
          <h1 className="page-title">アイテム編集</h1>
          <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
            <button>編集</button>
          </form>
        </div>
      )
    }else{                            
      return <h1>権限がありません</h1>  
    }
  }else{
      return <h1>ローディング中...</h1> 
  }
}

export default UpdateItem