import Image from "next/image"
import Link from "next/link" 

/* =========================
   型定義
========================= */
type Item = {
  _id: string
  image: string
  price: string
  title: string
  description: string
}

type ReadSingleItemResponse = {
  message: string
  singleItem: Item
}

type Context = {
  params: Promise<{
    id: string
  }>
}
/* =========================
   データ取得
========================= */
// const getSingleItem = async(id) => {
const getSingleItem = async (id: string): Promise<Item> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache:"no-store"})
  // const jsonData = await response.json()
  const jsonData: ReadSingleItemResponse = await response.json()
  // console.log(jsonData)
  const singleItem = jsonData.singleItem
  return singleItem
}
/* =========================
   コンポーネント
========================= */
// const ReadSingleItem = async(context) => {
const ReadSingleItem = async(context: Context) => {
  const params = await context.params
  const singleItem = await getSingleItem(params.id)
  return(
    <div className="grid-container-si">
      <title>{singleItem.title}</title>
      <meta name="description" content={singleItem.description}/>
      <div>
        <Image src={singleItem.image} width={720} height={500} alt="item-image" priority />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>¥{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
            <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
            <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  )
}

export default ReadSingleItem