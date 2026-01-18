"use client"
import {useState, useEffect} from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "@/app/utils/useAuth"

type DeleteItemResponse = {
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
type PageProps = {
  params: Promise<{
    id: string
  }>
}

// const DeleteItem = (context) => {
const DeleteItem = ({ params }: PageProps) => {
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
      // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`,{
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${resolvedParams.id}`,{
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          // title: title,
          // price: price,
          // image: image,
          // description: description,
          email: loginUserEmail,
        }),
      })
      const jsonData: DeleteItemResponse = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    }catch{
      alert("アイテム削除失敗")
    }
  }

  if(loading){
    if(loginUserEmail === email){
      return(
        <div>
          <title>削除ページ</title>
          <meta name="description" content="削除ページです"/>
          <h1 className="page-title">アイテム削除</h1>
          <form onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <Image src={image} width={750} height={500} alt="item-image" priority/>
            <h3>¥{price}</h3>
            <p>{description}</p>
            <button>削除</button>
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

export default DeleteItem