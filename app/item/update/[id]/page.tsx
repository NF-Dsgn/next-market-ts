"use client"
// import { useState, useEffect } from "react"
import { useState, useEffect, FormEvent, ChangeEvent, use } from "react"
import { useRouter } from "next/navigation" 
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
type UpdateItemProps = {
  params: Promise<{ id: string }>
}

// const UpdateItem = (context) => {
const UpdateItem = (props: UpdateItemProps) => {
    const resolvedParams = use(props.params)
    const itemId = resolvedParams.id

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
            // const params = await context.params
            // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`, {cache: "no-store"})
            // const jsonData = await response.json() 
            // const singleItem = jsonData.singleItem
            // setTitle(singleItem.title)
            // setPrice(singleItem.price)
            // setImage(singleItem.image)
            // setDescription(singleItem.description)
            // setEmail(singleItem.email) 
            // setLoading(true)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${itemId}`, { cache: "no-store" })
                // const jsonData = await response.json() 
                // const singleItem: ItemDataType = jsonData.singleItem

                // const jsonData: ApiResponse = await response.json() //「型注釈（: Type）」
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
                console.error("データの読み込みに失敗しました", error)
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
            // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`, {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${itemId}`, {
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
                    email: loginUserEmail    
                })
            })
            // const jsonData = await response.json()
            const jsonData = (await response.json()) as ApiResponse
            alert(jsonData.message)  
            router.push("/") 
            router.refresh()
        }catch{
            alert("アイテム編集失敗") 
        }
    }

    if (!loading) return <h1>ローディング中...</h1>
    if (loginUserEmail !== email) return <h1>権限がありません</h1>

    return (
        <div>
            <title>編集ページ</title>     
            <meta name="description" content="編集ページです"/>
            <h1 className="page-title">アイテム編集</h1>
            <form onSubmit={handleSubmit}>
                {/* <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea> */}

                <input 
                    value={title} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                    type="text" name="title" placeholder="アイテム名" required
                />
                <input 
                    value={price} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} 
                    type="text" name="price" placeholder="価格" required
                />
                <input 
                    value={image} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} 
                    type="text" name="image" placeholder="画像" required
                />
                <textarea 
                    value={description} 
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} 
                    name="description" rows={15} placeholder="商品説明" required
                ></textarea>
                <button type="submit">編集</button>
            </form>
        </div>
    )
}

export default UpdateItem