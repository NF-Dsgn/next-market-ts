"use client"
// import { useState, useEffect } from "react"
import { useState, useEffect, FormEvent, use } from "react"
import { useRouter } from "next/navigation" 
import Image from "next/image"   
import useAuth from "@/app/utils/useAuth"

type ItemDataType = {
  title: string
  price: string
  image: string
  description: string
  email: string
}
type ApiResponse = {
  message: string;
  singleItem?: ItemDataType; // 取得時はあるが、削除時は無いかもしれないので ? をつける
}
type DeleteItemProps = {
  params: Promise<{ id: string }>
}

// const DeleteItem = (context) => {
const DeleteItem = (props: DeleteItemProps) => {

    // React 19の useフックで Promiseである paramsをアンラップ
    const params = use(props.params)
    const itemId = params.id

    // const [title, setTitle] = useState("")
    // const [price, setPrice] = useState("")
    // const [image, setImage] = useState("")
    // const [description, setDescription] = useState("")
    // const [email, setEmail] = useState("")
    // const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const loginUserEmail = useAuth() 

    useEffect(() => {
        const getSingleItem = async() => {
            try {
                // const params = await context.params
                // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`, {cache: "no-store"})
                // const jsonData = await response.json() 
                // const singleItem = jsonData.singleItem
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${itemId}`, { cache: "no-store" })
                // const jsonData = await response.json() 
                // const singleItem: ItemDataType = jsonData.singleItem
                const jsonData = (await response.json()) as ApiResponse // 型アサーション (as Type)
                const singleItem = jsonData.singleItem
                if (singleItem) {
                    setTitle(singleItem.title)
                    setPrice(singleItem.price)
                    setImage(singleItem.image)
                    setDescription(singleItem.description)
                    setEmail(singleItem.email) 
                    setLoading(true)
                }
            } catch (error) {
                console.error("データの取得に失敗しました", error)
            }
        }  
        getSingleItem() 
    // }, [context])
    }, [itemId])

    // const handleSubmit = async(e) => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        // const params = await context.params
        try{
            // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${itemId}`, {
                method: "DELETE",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    email: loginUserEmail 
                })
            })
            // const jsonData = await response.json()
            const jsonData = (await response.json()) as ApiResponse
            alert(jsonData.message)
            router.push("/") 
            router.refresh()
        }catch{
            alert("アイテム削除失敗") 
        }
    }

    if (!loading) return <h1>ローディング中...</h1>
    if (loginUserEmail !== email) return <h1>権限がありません</h1>

    return (
        <div>
            <title>削除ページ</title>     
            <meta name="description" content="削除ページです"/>
            <h1 className="page-title">アイテム削除</h1>
            <form onSubmit={handleSubmit}>
                <h2>{title}</h2>
                {image && (
                  <Image src={image} width={750} height={500} alt="item-image" priority/>
                )}
                <h3>¥{price}</h3>
                <p>{description}</p>
                <button type="submit">削除</button>
            </form>
        </div>
    )

}

export default DeleteItem