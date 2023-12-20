import axios from "axios";
import { useEffect, useState } from "react";
import Ad from "./Ad";
import Cookies from "universal-cookie";

export default function AllAdvertisement(props) {
  const cookie = new Cookies()
  const [ad, set_ad] = useState('');
  useEffect(() => {
    try {
      (props.api === 'http://127.0.0.1:8000/api/my-properties/') ?
        axios.get(`${props.api}`,
          {
            headers: {
              'Authorization': `token ${cookie.get('token')}`
            }
          }
        ).then((res) => {
          console.log("res", res);
          set_ad(res.data.property);
        }) :
        axios.get(`${props.api}`).then((res) => {
          console.log("res", res);
          set_ad(res.data.property);
        })
    } catch (err) { }
  }, []);
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-lg text-slate-700 my-4">آخر الاعلانات</h1>
      <section className="flex flex-wrap justify-center gap-2 m-auto ">
        {ad.map((item, index) => (
          <Ad key={index} advertisment={item} />
        ))}
      </section>
    </div>
  )

}