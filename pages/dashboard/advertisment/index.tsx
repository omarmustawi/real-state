import { api_add_list_property } from "@/api/APIs";
import AllAdvertisement from "@/components/Advertisment/AllAdvertisement";
import LayoutDashboard from "@/components/layout/LayoutDashboard";

export default function Ads() {
    return (
        <LayoutDashboard>
            <AllAdvertisement api={api_add_list_property} />
        </LayoutDashboard>
    )
}