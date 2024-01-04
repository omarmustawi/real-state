import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Ad from "./Ad";
import Cookies from "universal-cookie";
import { useProperties } from "@/contexts/properties";
import { Advertisement } from "@/utility/constants";

interface AllAdvertisementProps {
  api: string;
}

export default function AllAdvertisement({ api }: AllAdvertisementProps) {
  const cookie = new Cookies();
  const { properties, setProperties } = useProperties();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response: AxiosResponse<{ properties: Advertisement[] }>;

        if (api === 'http://127.0.0.1:8000/api/my-properties/') {
          response = await axios.get(api,
            {
              headers: {
                'Authorization': `token ${cookie.get('token')}`
              }
            }
          )
        } else {
          response = await axios.get(api)
        }

        console.log("response: ", response );

        setProperties(response.data.properties);
        setLoading(!loading)
      } catch (err) {
        console.error("Error fetching data:", err);
      }

    }
    fetchData()
  }, []);
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-lg text-slate-700 my-4">آخر الاعلانات</h1>
      <section className="flex flex-wrap justify-center gap-2 m-auto ">
        {
          loading ?
            <p className="loading"> جاري التحميل...  <br /> يرجا الانتظار</p>
            :
            properties.map((item: Advertisement) => (
              <Ad key={item.id} advertisment={item} />
            ))}
      </section>
    </div>
  )

}