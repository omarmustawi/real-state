import { api_toggle_favorite } from "@/api/APIs";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Ad from "@/components/Advertisment/Ad";
import { Advertisement } from "@/utility/constants";
import { useProperties } from "@/contexts/properties";


export default function Favorite() {
  const cookie = new Cookies();
  const { properties, setProperties } = useProperties();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const propertiesFavorite = async () => {
      const response = await axios.get(api_toggle_favorite, {
        headers: {
          Authorization: `token ${cookie.get("token")}`,
        },
      });
      if (response.data.status === 200) {
        setLoading(false);
        setProperties(response.data.favorite_list);
      }
      console.log(response);
    };
    propertiesFavorite();
  }, []);
  return (
    <section className="background2 min-h-screen">
      <div className="flex flex-wrap justify-center gap-2 m-auto pt-36">
        {loading ? (
          <p className="loading">
            {" "}
            جاري التحميل... <br /> يرجا الانتظار
          </p>
        ) : (
          properties.map((item: Advertisement) => (
            <Ad key={item.id} advertisment={item} />
          ))
        )}
      </div>
    </section>
  );
}
