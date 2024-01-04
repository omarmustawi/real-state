import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../../public/logo.png";
import Image from "next/image";
import Cookies from "universal-cookie";
import { IoSettings } from "react-icons/io5";

export default function Header() {
  const cookie = new Cookies();

  //  THIS SECTION I GOT TIRED TO DO IT 😏
  // IT IS FOR NAVIGATE TO ADVERTISES LIST OR TO ADDNESS ADVERTISE
  const router = useRouter();
  function navigateToAdvertise() {
    const s_value = document.getElementById("advertiser");
    router.push(s_value.value);
  }
  // ================= THE END OF THE GREAT FUNCTION :) ===============
  function handleLogOut() {
    console.log("log out");
    cookie.remove("id");
    cookie.remove("full_name");
    cookie.remove("email");
    cookie.remove("role");
    cookie.remove("token");
  }
  const allCookie = cookie.getAll();
  return (
    <>
      {/* {allCookie.id === 1 &&
        allCookie.email &&
        allCookie.token &&
        allCookie.full_name &&
        allCookie.role && (
          <IoSettings
            onClick={() => router.push("/dashboard/users/allUsers")}
            size={25}
            className="fixed top-24 right-6 cursor-pointer text-slate-600 z-20  hover:-rotate-90 scroll-smooth delay-0 transition-all"
          />
        )} 
        I will back here and fix it
        
        */}
      <nav className="flex absolute border-b-2 w-full justify-between items-center z-20">
        <Link href="/" className="my-3 mr-7">
          <Image src={logo} width={60} height={40} alt="logo" />
        </Link>
        <ul className="flex gap-8 text-zinc-500">
          <li className="hover:text-stone-600">
            <Link href="/">الصفحة الرئيسية </Link>
          </li>
          <li className="hover:text-stone-600">
            <Link href="/search_about_real_estate">ابحث عن عقار </Link>
          </li>
          <li className="hover:text-stone-600">
            <select
              id="advertiser"
              onInput={() => navigateToAdvertise()}
              className="bg-transparent"
            >
              <option defaultValue value="/">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; المعلن:
              </option>
              <option value="/advertiser/add_advertise"> إضافة إعلان</option>
              <option value="/advertiser/my_advertises"> إعلاناتي</option>
              <option value="/favorite">
                المفضلة
              </option>
            </select>
          </li>
          <li className="hover:text-stone-600">
            <Link href="/all_advertises"> جميع الإعلانات </Link>
          </li>
          <li className="hover:text-stone-600">
            <Link href="/about_us">معلومات عنا</Link>
          </li>
        </ul>
        {/* {cookie.get("id") === undefined ? ( */}
        <Link
          href="/register/logIn"
          className="text-zinc-800 ml-10 hover:text-stone-600"
        >
          تسجيل دخول
        </Link>
        {/* ) : (
        <button
          onClick={handleLogOut}
          className="text-zinc-800 ml-10 hover:text-stone-600"
        >
          تسجيل خروج
        </button>
      ) */}

        {/* } */}
      </nav>
    </>
  );
}
