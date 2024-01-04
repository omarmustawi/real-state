import myImage from "../../../public/myImage.png";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import Image from "next/image";
import { useOpenSidebar } from "@/contexts/openSidebar";
import { api_message } from "@/api/APIs";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { useMessages } from "@/contexts/messages";

export default function Topbar() {
  // ========== fetch message ==============
  const [isHiddenMes, setIsHiddenMes] = useState(false);
  const { messages, setMessages } = useMessages();
  const cookie = new Cookies();
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(`${api_message}`, {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        });
        console.log("res message: ", res);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMessage();
  }, [cookie.get("token")]);
  // ============= the end =====================

  // HOOKS I CREATED FOR OPEN sidebar OR CLOSE IT
  const { isOpen, setIsOpen } = useOpenSidebar();
  return (
    <section className="w-full flex justify-end">
      <div
        className={`topbar ${
          isOpen
            ? " duration-[calc(1s)] w-[calc(100%-17rem)] "
            : " duration-[calc(3s)] w-full"
        } transition-all `}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer relative z-10"
        >
          <AiOutlineMenu color="#009cff" size={20} />
        </div>
        <div className="flex items-center gap-6 text-xs text-gray-600 ">
          <div>
            <div
              onClick={() => setIsHiddenMes(!isHiddenMes)}
              className="flex  items-center cursor-pointer"
            >
              <RiMessengerLine
                className={messages.length > 0 && "text-gray-950 "}
                size={messages.length > 0 ? 25 : 20}
              />
              {messages.length > 0 && (
                <div className="text-xs text-white bg-red-400 w-4 h-4 text-center rounded-full absolute -translate-y-2 translate-x-2">
                  {messages.length}
                </div>
              )}
              رسائل
            </div>
            {isHiddenMes && messages.length > 0 && (
              <ul className="absolute z-50 bg-white p-3 rounded shadow-xl">
                {messages.map((item) => (
                  <li
                    className={`my-4 border-b-2 p-2 relative ${
                      !item.is_readed && "font-semibold"
                    }`}
                    key={item.id}
                  >
                    <div>
                      رسالة من{" "}
                      <a
                        className="text-blue-500 hover:underline"
                        href={`mailto:${item.sender_email}?subject=Subject%20Text&body=Body%20Text`}
                      >
                        {" "}
                        {item.sender_email}{" "}
                      </a>{" "}
                      {item.created_at}
                    </div>
                    <Link
                      className="absolute left-0 top-0"
                      href={`/dashboard/users/message/${item.id}`}
                    >
                      <FaRegEye size={20} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <p className="flex  items-center cursor-pointer">
              {" "}
              اشعارات <MdOutlineNotificationsNone size={20} />{" "}
            </p>
          </div>
          <div className="flex gap-2  items-center cursor-pointer ">
            <Image
              height={50}
              className="rounded-full border-blue-400 border-2 "
              src={myImage}
              alt=""
            />{" "}
            <p> عمر مصطاوي </p>
          </div>
        </div>
      </div>
    </section>
  );
}
