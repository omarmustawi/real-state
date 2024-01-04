import { api_add_list_property } from "@/api/APIs";
import AllAdvertisement from "@/components/Advertisment/AllAdvertisement";

export default function All_advertises() {
  return (
    <section className="background2 min-h-screen pt-32">
      <AllAdvertisement api={api_add_list_property} />
    </section>
  );
}
