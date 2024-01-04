import myImage from "../../../public/myImage.png";
import logo from "../../../public/logo.png";
import { FaUsers } from "react-icons/fa";
import { RiUserSearchLine } from "react-icons/ri";
import { CgList } from "react-icons/cg";
import { CiHome } from "react-icons/ci";
import Image from "next/image";
import { useOpenSidebar } from "@/contexts/openSidebar";
import Link from "next/link";

export default function Sidebar() {
  // const context = useContext()
  // const isOpenContext = context(OpenSidebarProvider)
  const { isOpen, setIsOpen } = useOpenSidebar();

  return (
    <section
      className={`sidebar ${
        isOpen
          ? "translate-x-0 duration-[calc(2s)] "
          : "translate-x-full duration-[calc(1s)]"
      }`}
    >
      <Image className="mx-auto" height={50} src={logo} alt="" />
      <div className="flex  justify-around items-center gap-3">
        <Image
          width={50}
          className="rounded-full border-blue-400 border-2 "
          src={myImage}
          alt=""
        />
        <p className="text-slate-500"> عمر مصطاوي </p>
      </div>
      <ul className="flex flex-col gap-6 text-slate-600 text-sm ">
        <Link href={"/"}>
          <li className="flex gap-2 items-center ">
            {" "}
            <CiHome size={30} /> الرئيسية
          </li>
        </Link>
        <Link href={"/dashboard/users/allUsers"}>
          <li className="flex gap-2 items-center">
            {" "}
            <FaUsers size={30} /> المستخدمين
          </li>
        </Link>
        <Link href={"/dashboard/users/searchAboutUser"}>
          <li className="flex gap-2 items-center">
            {" "}
            <RiUserSearchLine size={30} /> البحث عن مستخدم
          </li>
        </Link>
        <Link href={"/dashboard/advertisment"}>
          <li className="flex gap-2 items-center">
            {" "}
            <CgList size={30} /> الاعلانات
          </li>
        </Link>
      </ul>
    </section>
  );
}
