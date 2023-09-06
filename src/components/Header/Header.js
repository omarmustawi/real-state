import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../../../public/logo.png";
import Image from "next/image";

export default function Header() {
  //  THIS SECTION I GOT TIRED TO DO IT 😏
  // IT IS FOR NAVIGATE TO ADVERTISES LIST OR TO ADDNESS ADVERTISE
  const router = useRouter();
  function navigateToAdvertise() {
    const s_value = document.getElementById("advertiser");
    router.push(s_value.value);
  }
  // ================= THE END OF THE GREAT FUNCTION :) ===============
  return (
    <nav className="flex absolute border-b-2 w-full justify-between items-center z-20">
      <Link href="/" className="my-3 mr-7">
        <Image src={logo} width={60} height={40} alt="logo" />
      </Link>
      <ul className="flex gap-8 text-zinc-500">
        <li  className="hover:text-stone-600">
          <Link href="/">الصفحة الرئيسية </Link>
        </li>
        <li  className="hover:text-stone-600">
          <Link href="/search_about_real_estate">ابحث عن عقار </Link>
        </li>
        <li  className="hover:text-stone-600">
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
          </select>
        </li>
        <li  className="hover:text-stone-600">
          <Link href="/all_advertises">  جميع الإعلانات  </Link>
        </li>
        <li  className="hover:text-stone-600">
          <Link href="/about_us">معلومات عنا</Link>
        </li>
      </ul>
      <Link href='/register/logIn' className="text-zinc-800 ml-10 hover:text-stone-600">تسجيل دخول</Link>
    </nav>
  );
}
