import Table from "@/components/Table/Table";
import LayoutDashboard from "@/components/layout/LayoutDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import {api_all_users} from "@/api/APIs";
import {useUsersList} from "@/contexts/all_users"

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: boolean;
}


export default function AllUsers() {
  const cookie = new Cookies();
  const [loading, setLoading] = useState(true);
  const {users_list, set_users_list } = useUsersList();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{users: User[]}>(api_all_users, {
          headers: {
            Authorization: `token ${cookie.get('token')}`,
          }
        });
        if( res.status === 200 ){
          set_users_list(res.data.users);
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [cookie.get('token'), set_users_list]);

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
    }
  ];

  return (
    <LayoutDashboard>
      {
        loading ? (
          <p className="loading"> جاري التحميل...  <br /> يرجا الانتظار</p>
        ) : (
          <Table header={header} body={users_list} />
        )
      }
    </LayoutDashboard>
  );
}
