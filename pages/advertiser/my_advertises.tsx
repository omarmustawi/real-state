import AllAdvertisement from "@/components/Advertisment/AllAdvertisement";
import { api_my_properties } from "@/api/APIs";

export default function My_advertises() {
    return <section className="bg-backgroundcolor min-h-screen pt-32">
        <AllAdvertisement api={api_my_properties} />
    </section>
}