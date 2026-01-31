import Link from "next/link"
import Image from "next/image"
import { ItemDataType, ApiResponse } from "@/app/types"
import { Metadata } from "next"

// type Item = {
//   _id: string
//   image: string
//   price: string
//   title: string
//   description: string
// }
// type ReadAllItemsResponse = {
//   message: string
//   allItems: Item[]
// }


// export const metadata = {
export const metadata: Metadata = {
  title: "NextMarket TOP",
  description: "一覧ページです"
}

/* =========================
   データ取得
========================= */
// const getAllItems = async() => {
// const getAllItems = async (): Promise<ReadAllItemsResponse> => {
// const getAllItems = async (): Promise<Item[]> => {
const getAllItems = async (): Promise<ItemDataType[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`,
    {cache: "no-store"}
  )
  // const jsonData = await response.json()
  // const jsonData: ReadAllItemsResponse = await response.json()
  const jsonData: ApiResponse<ItemDataType> = await response.json()

  // console.log(jsonData)
  // const allItems = jsonData.allItems 
  // return allItems
  return jsonData.allItems || []
}

/* =========================
   コンポーネント
========================= */
const ReadAllItems = async() => {
  const allItems = await getAllItems()
  // console.log(allItems)
  return (
    <div className="grid-container-in">
      {/* <title>NextMarket</title> */}
      {/* <meta name="description" content="NextMarketです"/> */}

      {allItems.map(item => 
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image src={item.image} width={750} height={500} alt="item-image" priority />
          <div>
            <h2>{item.price}</h2>
            <h3>{item.title}</h3>
            {/* <p>{item.description.substring(0, 80)}...</p> */}
            <p>{item.description?.substring(0, 80)}...</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default ReadAllItems