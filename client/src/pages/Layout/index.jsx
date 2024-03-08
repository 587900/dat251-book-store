import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer";

const Layout = () => {
    return (
      <div style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
}

export default Layout