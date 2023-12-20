import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { FaTable } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { api_property_detail } from "@/api/APIs";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Ad({ advertisment }) {
  const cookie = new Cookies();
  const router = useRouter();

  // Get the advertisement ID from the URL
  const advertisementId = router.pathname;
  console.log("ad", advertisementId);

  async function handle_del() {
    try {
      console.log("id", advertisment.id);
      await axios
        .delete(`${api_property_detail}${advertisment.id}/`, {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        })
        .then((res) => {
          console.log("res: ", res);
        });
    } catch (err) {
      console.error("error:", err);
    }
  }
  return (
    <div className="  rounded-xl shadow-md m-2">
      <dev className="relative ">
        <Image
          src={`http://127.0.0.1:8000${advertisment.images}`}
          className="rounded-t-md "
          alt={advertisment.images}
          width={450}
          height={500}
        />
        <div className="layer-black "></div>
        <MdOutlineFavoriteBorder
          size={25}
          className="absolute top-6 right-5 "
          color={"#fff"}
        />
        <h1 className="absolute bottom-11 right-4 text-white">
          {" "}
          السعر {advertisment.price} ل.س{" "}
        </h1>
        <h1 className="absolute bottom-3 right-4 text-white">
          {" "}
          {advertisment.type_property === 0
            ? "شقّة"
            : advertisment.type_property === 1
            ? "محل تجاري"
            : "فيلا"}{" "}
          {advertisment.type_deal ? "للبيع" : "للأجار"}
        </h1>
        <p dir="ltr" className="absolute bottom-3 left-4 text-white">
          {" "}
          {advertisment.space} m&sup2;{" المساحة"}
        </p>
      </dev>
      <div className="p-5 text-slate-600 ">
        <p className="flex gap-2 items-center">
          {" "}
          <BiSolidPhoneCall /> {advertisment.phone}{" "}
        </p>
        <p className="flex gap-2 items-center">
          {" "}
          <IoLocation />
          {advertisment.city}
          <space />
          {advertisment.address}{" "}
        </p>
        <p className="flex gap-2 items-center">
          <FaTable /> عدد الغرف:
          {advertisment.num_room}{" "}
        </p>
        {/* <p> {advertisment.description} </p> */}
        {/* <p> {advertisment.adviser} </p> */}
        <p> {advertisment.is_alive} </p>
        <p> تاريخ النشر: {advertisment.date} </p>
        {advertisementId.includes("/dashboard/advertisment") && (
          <div className="my-3">
            <button onClick={handle_del} className="btn-del p-1 flex items-center">
            حذف <RiDeleteBin6Line size={20} /> 
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
