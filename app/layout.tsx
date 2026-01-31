import "@/app/globals.css"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import type { ReactNode } from "react"
import type { Metadata } from "next"

// サイト全体の共通タイトルや説明を定義
export const metadata: Metadata = {
  title: "NextMarket",
  description: "Next.jsで作成したマーケットプレイスアプリです",
}

type RootLayoutProps = {
  children: ReactNode
}

// const RootLayout = ({ children }) => {
const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            <body>
                <Header/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}

export default RootLayout