import { Outlet } from "react-router";
import Navbar from "../components/Headers/Navbar";
import Footer from "../components/Footer/Footer.jsx";


const MainLayout = () => {
    return(
        <main className="dark:bg-black overflow-hidden">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </main>
    )
}

export default MainLayout;