import axios from "axios";
import { api_all_users } from "@/api/APIs";
import Cookies from "universal-cookie";
import { useUsersList } from "@/contexts/all_users";
import { User } from "../../../pages/dashboard/users/allUsers";

interface TableProps {
  header: { key: string; name: string }[];
  body: User[];
}
// ============================================
const RowActions = ({ userId, onDelete }: {userId: number, onDelete: any}) => (
  <td>
    <button className="bg-specialBlue  text-white p-2 rounded-lg ml-3 hover:bg-specialBlue/50">
      تفاصيل
    </button>
    <button
      onClick={() => onDelete(userId)}
      className="btn-del"
    >
      حذف
    </button>
  </td>
)
// ================================================
export default function Table({ header, body }: TableProps) {
  const { removeUser } = useUsersList();
  const cookie = new Cookies();

  // ========== Handle delete user ==========
  async function handleDeleteUser(id: number) {
    try {
      let res = await axios.delete(`${api_all_users}${id}/`, {
        headers: {
          Authorization: `token ${cookie.get("token")}`,
        },
      });
      console.log("res: ", res.data);
      if (res.data.status === 204) {
        removeUser(id)
      } else if (res.data.status === 400) {
        console.log(res.data.message);
      }
    } catch {
      console.log("error");
    }
  }
  // ===========================================

  // HEADER OF TABLE
  const headerShow = header?.map((col, id) => (
    <th key={id} className="px-6 py-3 text-start">
      {col.name}
    </th>
  ));
// ===============================================
  const bodyShow = body?.map((row, index1) => (
    <tr key={index1} className="border-b relative hover:bg-slate-200">
      {header?.map((col, index2) => (
        <td key={index2} className="py-3 px-6">
          {col.key === "id" ? index1 + 1 : (row as any)[col.key]}
        </td>
      ))}
      <RowActions userId={row["id"]} onDelete={handleDeleteUser} />
    </tr>
  ));
// ====================================================
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
