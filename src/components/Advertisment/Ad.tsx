import Image from "next/image";
import { IoLocation } from "react-icons/io5";
import { FaTable } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import axios from "axios";
import {
  api_property_detail,
  api_toggle_avaliable,
  api_toggle_favorite,
} from "@/api/APIs";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useProperties } from "@/contexts/properties";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdLockOpen } from "react-icons/md";
import Link from "next/link";
import {
  typePropertyClasses,
  Advertisement,
  getTypeDealText,
} from "@/utility/constants";

export default function Ad({ advertisment }: { advertisment: Advertisement }) {
  const cookie = new Cookies();
  const router = useRouter();

  // Get the advertisement ID from the URL
  const advertisementId = router.pathname;

  const { removeProperty, toggleFavorite, toggleAvaliable } = useProperties();

  // =========== handle delete ==============
  async function handle_del() {
    try {
      let response = await axios.delete(
        `${api_property_detail}${advertisment.id}/`,
        {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        }
      );
      if (response.data.status === 204) {
        removeProperty(advertisment.id);
      }
    } catch (err) {
      console.error("error:", err);
    }
  }
  // ================ the end ================

  // ============ handle_toggle_avaliable ===============
  async function handle_toggle_avaliable() {
    try {
      let response = await axios.post(
        `${api_toggle_avaliable}`,
        {
          property_id: advertisment.id,
        },
        {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        }
      );

      if (response.data.status === 200) {
        toggleAvaliable(advertisment.id);
      }
    } catch (err) {
      console.error("error:", err);
    }
  }
  // ======================= the end ========================

  // ================ add and remove favorite  ================
  async function ToggleFavorite() {
    try {
      let response = await axios.post(
        `${api_toggle_favorite}`,
        { property_id: `${advertisment.id}` },
        {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        }
      );
      if (response.data.status === 200) {
        const action = advertisment.favorite_users.includes(cookie.get("id"))
          ? "remove"
          : "add";
        toggleFavorite(advertisment.id, action);
        if (router.pathname === "/favorite") {
          removeProperty(advertisment.id);
        }
      }
    } catch (err) {
      console.error("error:", err);
    }
  } // =================== the end ======================

  return (
    <div className="h-fit rounded-xl shadow-md m-2">
      <div className="relative ">
        <Image
          src={`http://127.0.0.1:8000${advertisment.images}`}
          className="rounded-t-md "
          alt={advertisment.images}
          width={450}
          height={500}
        />
        <div className="layer-black "></div>
        <div
          className="cursor-pointer absolute top-6 right-5"
          onClick={ToggleFavorite}
        >
          {advertisment.favorite_users.includes(cookie.get("id")) ? (
            <MdOutlineFavorite size={30} className={"text-red-500"} />
          ) : (
            <MdOutlineFavoriteBorder size={25} className={"text-white"} />
          )}
        </div>
        <h1 className="absolute bottom-11 right-4 text-white">
          {" "}
          السعر {advertisment.price} ل.س{" "}
        </h1>
        <h1 className="absolute bottom-3 right-4 text-white">
          {typePropertyClasses[advertisment.type_property]}{" "}
          {getTypeDealText(advertisment)}
        </h1>
        <p dir="ltr" className="absolute bottom-3 left-4 text-white">
          {" "}
          {advertisment.space} m&sup2;{" المساحة"}
        </p>
      </div>
      <div className="p-5 text-slate-600 relative ">
        <p className="flex gap-2 items-center">
          {" "}
          <BiSolidPhoneCall /> {advertisment.phone}{" "}
        </p>
        <p className="flex gap-2 items-center">
          {" "}
          <IoLocation />
          {advertisment.city} {advertisment.address}{" "}
        </p>
        <p className="flex gap-2 items-center">
          <FaTable /> عدد الغرف:
          {advertisment.num_room}{" "}
        </p>
        {/* <p> {advertisment.description} </p> */}
        {/* <p> {advertisment.adviser} </p> */}
        <p> {advertisment.is_alive} </p>
        <p> تاريخ النشر: {advertisment.date.toLocaleString()} </p>
        {advertisementId.includes("/dashboard/advertisment") ||
          (advertisment.adviser === cookie.get("id") && (
            <div className="my-3 flex  gap-2">
              <button
                onClick={handle_del}
                className="btn-del flex items-center"
              >
                حذف <RiDeleteBin6Line size={20} />
              </button>
              <button
                onClick={handle_toggle_avaliable}
                className="btn-close flex items-center"
              >
                {advertisment.is_alive ? (
                  <>
                    {" "}
                    إغلاق <HiOutlineLockClosed size={20} />{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    إعادة النشر
                    <MdLockOpen size={20} />{" "}
                  </>
                )}
              </button>
            </div>
          ))}
        <div className="mt-7">
          <Link
            className="btn text-sm py-0 px-2"
            href={`/all_advertises/${advertisment.id}`}
          >
            لمزيد من المعلومات...
          </Link>
        </div>
        <div className="text-blue-400 absolute left-5 bottom-5 ">
          {advertisment.is_alive ? "متاح" : "تم الإغلاق"}
        </div>
      </div>
    </div>
  );
}
