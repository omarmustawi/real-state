import { api_property_detail } from "@/api/APIs";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
  Advertisement,
  typePropertyClasses,
  getTypeDealText,
} from "@/utility/constants";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function DetailsProperty() {
  const router = useRouter();
  const propertyId = router.query.id;
  const cookie = new Cookies();
  const [propertyCurrent, setPropertyCurrent] = useState<Advertisement>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${api_property_detail}${propertyId}/`, {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        });
        if (res.data.status === 200) {
          setPropertyCurrent(res.data.property);
        }
        console.log(res.data);
      } catch (err) {
        console.error("error");
      }
    };
    fetchData();
  }, [propertyId]);

  return (
    <section className="bg-backgroundcolor pt-40 p-20 ">
      <div>
        <Image
          src={`http://127.0.0.1:8000/${propertyCurrent?.images}`}
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div>
        <div> users info </div>
        <div className="text-sm text-slate-600">
          <div> {propertyCurrent?.description} </div>
          <div className="text-blue-600 underline inline">
            {" "}
            {propertyCurrent?.phone}
          </div>
          <BsFillTelephoneFill className="inline mr-2" size={20} />
          <div className="bg-white rounded p-5 text-sm text-blue-400 m-5">
            <p className="border-b-2 p-4">
              المدينة:{" "}
              <span className="text-slate-700">{propertyCurrent?.city}</span>{" "}
            </p>
            <p className="border-b-2 p-4">
              {" "}
              العنوان:{" "}
              <span className="text-slate-700">
                {propertyCurrent?.address}
              </span>{" "}
            </p>
            <p className="border-b-2 p-4">
              {" "}
              نوع العقار:{" "}
              <span className="text-slate-700">
                {" "}
                {typePropertyClasses[propertyCurrent?.type_property]}
              </span>{" "}
            </p>
            <p className="border-b-2 p-4">
              {" "}
              نوع الصفقة:{" "}
              <span className="text-slate-700">
                {" "}
                {getTypeDealText(propertyCurrent)}
              </span>{" "}
            </p>
          </div>

          <div className="bg-blue-100 border-blue-400 border-2  rounded p-5 text-sm m-5">
            <p className="border-b-2 border-white p-4">
              السعر:{" "}
              <span className="text-slate-700">
                {propertyCurrent?.price} ليرة سوري
              </span>{" "}
            </p>
            <p className="border-b-2 border-white p-4">
              المساحة:{" "}
              <span className="text-slate-700">
                {propertyCurrent?.space}
                m&sup2; متر مربع
              </span>{" "}
            </p>
            <p className="border-b-2 border-white p-4">
              عدد الغرف:{" "}
              <span className="text-slate-700">
                {propertyCurrent?.num_room}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
