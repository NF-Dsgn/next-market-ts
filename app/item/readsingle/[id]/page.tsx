import Image from "next/image"
import Link from "next/link"
import { ItemDataType, ApiResponse, PageProps } from "@/app/types"
import { Metadata } from "next"

/* =========================
   型定義
========================= */
// type Item = {
//   _id: string
//   image: string
//   price: string
//   title: string
//   description: string
// }

// type ReadSingleItemResponse = {
//   message: string
//   singleItem: Item
// }

// type Context = {
//   params: Promise<{
//     id: string
//   }>
// }
/* =========================
   データ取得
========================= */
// const getSingleItem = async(id) => {
// const getSingleItem = async (id: string): Promise<Item> => {
const getSingleItem = async (id: string): Promise<ItemDataType> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache:"no-store"})
  // const jsonData = await response.json()
  // const jsonData: ReadSingleItemResponse = await response.json()
  const jsonData: ApiResponse<ItemDataType> = await response.json()
  // console.log(jsonData)

  if (!jsonData.singleItem) {
    throw new Error("アイテムが見つかりませんでした")
  }

  // const singleItem = jsonData.singleItem
  // return singleItem
  return jsonData.singleItem
}


/* =========================
   メタデータ生成 (ここに追加！)
========================= */
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params
  const singleItem = await getSingleItem(id)

  return {
    title: `${singleItem.title} | NextMarket`,
    description: singleItem.description,
  }
}

/* =========================
   コンポーネント
========================= */
// const ReadSingleItem = async(context) => {
// const ReadSingleItem = async(context: Context) => {
const ReadSingleItem = async (context: PageProps) => {
  // const params = await context.params
  const { id } = await context.params
  // const singleItem = await getSingleItem(params.id)
  const singleItem = await getSingleItem(id)

  return(
    <div className="grid-container-si">
      {/* <title>{singleItem.title}</title> */}
      {/* <meta name="description" content={singleItem.description}/> */}
      
      <div>
        <Image src={singleItem.image} width={720} height={500} alt="item-image" priority />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>¥{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
            {/* _id は ItemDataType で ? 付きにしているので、
                TypeScriptが警告を出す場合は singleItem._id! と書くか
                以下のテンプレートリテラルで解決 */}
            <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
            <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  )
}

export default ReadSingleItem