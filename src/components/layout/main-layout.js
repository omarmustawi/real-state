import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";

const MainLayout = ({ children }) => {
  const router = useRouter();
  //  CHECK IF THE CURRENT PAGE IS THE dashboard
  const isDashboard = router.pathname.includes( "/dashboard") ;
  return (
    <div>
      {!isDashboard && <Header />}
      <main>{children} </main>
      {/* <Footer /> */}
    </div>
  );
};
export default MainLayout;
