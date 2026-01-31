// types.ts

// ユーザーデータの型
export type UserDataType = {
  name?: string      // ログイン時は不要なこともあるので ?
  email: string
  password?: string   // セキュリティ上、扱いに注意が必要
}

// アイテムデータの基本形
export type ItemDataType = {
  _id?: string        // 取得時はあるが作成時は無いので ? をつける
  title: string
  price: string
  image: string
  description: string
  email: string
}

// APIレスポンスの共通形 中身（ItemなのかUserなのか）だけを後から差し替え可能にするためのジェネリクス
export type ApiResponse<T = any> = {
  message: string
  singleItem?: T      // 1つのアイテム
  allItems?: T[]      // アイテムの配列
  token?: string      // ログイン用
}

// ページコンポーネントのProps
export type PageProps = {
  params: Promise<{ id: string }>
}