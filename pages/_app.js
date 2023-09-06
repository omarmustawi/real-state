import MainLayout from "@/components/layout/main-layout";
import "../styles/globals.css";
// /////////////////
// STEPS IMPORT FONT:
import localFont from "@next/font/local"; // step -1-
const lemonada = localFont({
  // step -2-
  src: "../public/fonts/static/Lemonada-Medium.ttf",
  weight: "500",
  display: "swap",
  variable: "--font-lemonada",
});
///////////////////
function MyApp({ Component, pageaProps }) {
  return (
    <div dir="rtl" className={lemonada.variable}>
      {/* step -3- */}
      <MainLayout>
        <Component {...pageaProps} />
      </MainLayout>
    </div>
  );
}

export default MyApp;
