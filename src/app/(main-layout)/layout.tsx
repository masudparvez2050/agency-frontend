import { ReactNode } from "react";
import Navbar from "@/components/shared/main/Navbar";
import Footer from "@/components/shared/main/Footer";
import FloatingWidgets from "@/components/shared/main/FloatingWidgets";

const MainLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default MainLayout;