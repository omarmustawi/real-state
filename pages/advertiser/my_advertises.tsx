import Cookies from "universal-cookie";
import AllAdvertisement from "@/components/Advertisment/AllAdvertisement";
import { api_my_properties } from "@/api/APIs";


export default function My_advertises() {
    const cookie = new Cookies()

    return <section className="bg-backgroundcolor min-h-screen pt-32">
        <AllAdvertisement api={api_my_properties} />
    </section>
}