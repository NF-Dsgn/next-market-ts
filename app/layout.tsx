import "@/app/globals.css"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import type { ReactNode } from "react"

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