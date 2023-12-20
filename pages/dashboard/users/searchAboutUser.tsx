import { api_search } from "@/api/APIs";
import Table from "@/components/Table/Table";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function SearchAboutUser() {
  const [search, setSearch] = useState<string>();
  const [searchUsersList, setSearchUsersList] = useState([]);
  const [isDisplayResult, setIsDisplayResult] = useState(false);
  const cookie = new Cookies();

  async function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${api_search}`,
        { search: search },
        {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        }
      );
      if (res.data.status === 200) {
        setSearchUsersList(res.data.users);
        setIsDisplayResult(true);
      }
    } catch (err) {
      console.error("there is an error");
    }
  }
  const header = [
    {
      key: "id",
      name: "الرقم",
    },
    {
      key: "full_name",
      name: "الاسم",
    },
    {
      key: "email",
      name: "الايميل",
    },
  ];

  return (
    <LayoutDashboard>
      <section className="w-full h-[calc(100vh-74px)] flex flex-col justify-center items-center mx-[calc(1rem)] ">
        <form className="flex flex-col justify-center w-1/3">
          <input
            placeholder="أدخل كلمة بحث..."
            className="rounded-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn" onClick={submitSearch}>
            بحث
          </button>
        </form>
        {isDisplayResult ? (
          searchUsersList.length > 0 ? (
            <Table header={header} body={searchUsersList} />
          ) : (
            <div className="text-slate-600 mt-5">
              {" "}
              لا يوجد عناصر تتضمن هذه الكلمة...{" "}
            </div>
          )
        ) : (
          ""
        )}
      </section>
    </LayoutDashboard>
  );
}
