import axios from "axios";
import { api_all_users } from "@/api/APIs";
import Cookies from "universal-cookie";
import { useUsersList } from "@/contexts/all_users";

export default function Table({ header, body }) {
  // HEADER OF TABLE
  const headerShow = header?.map((col, id) => (
    <th key={id} className="px-6 py-3 text-start">
      {" "}
      {col.name}{" "}
    </th>
  ));

  const bodyShow = body?.map((row, index1) => (
    <tr key={index1} className="border-b relative hover:bg-slate-200">
      {header?.map((col, index2) => (
        <td key={index2} className="py-3 px-6">
          {col.key === "id" ? index1 + 1 : row[col.key]}
        </td>
      ))}
      <td>
        <button className="bg-specialBlue  text-white p-2 rounded-lg ml-3 hover:bg-specialBlue/50">
          تفاصيل
        </button>
        <button
          onClick={() => handleDeleteUser(row["id"])}
          className="btn-del"
        >
          حذف
        </button>
      </td>
    </tr>
  ));

  // ========== Handle delete user ==========
  const { users_list, set_users_list } = useUsersList();
  const cookie = new Cookies();
  async function handleDeleteUser(id) {
    try {
      let res = await axios.delete(`${api_all_users}${id}/`, {
        headers: {
          Authorization: `token ${cookie.get("token")}`,
        },
      });
      console.log("res: ", res.data);
      if (res.data.status === 204) {
        set_users_list(users_list.filter((user) => user.id !== id));
        console.log("users: ", users_list);
      } else if (res.data.status === 400) {
        console.log(res.data.message);
      }
    } catch {
      console.log("error");
    }
  }
  // ===========================================

  return (
    <div className=" p-7 z-30 my-4 bg-backgroundGray w-full rounded-xl mx-[calc(1rem)]">
      <table className="w-full">
        <thead className="p-7 text-slate-600 text-sm">
          <tr>
            {headerShow}
            <th className="text-start">الاعدادات</th>
          </tr>
        </thead>
        <tbody className="text-xs text-gray-500">{bodyShow}</tbody>
      </table>
    </div>
  );
}
