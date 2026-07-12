import { ReactNode } from "react"
import Navbar from "@/components/shared/main/Navbar";
import Footer from "@/components/shared/main/Footer";

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout