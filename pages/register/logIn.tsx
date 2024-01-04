"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_login } from "@/api/APIs";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";

function Backdrop({ children }: any) {
  return (
    <div className="bg-opacity-80 bg-slate-100 w-screen h-screen  fixed  flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  for Alert
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const notify = () => toast(errorAlertMessage);

  // HANDLE REGISTER
  async function handleSubmit(e: React.FormEvent) {
    if( email === "" || password === "") {
      setErrorAlertMessage("املأ كل الحقول.");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(api_login, {
        email,
        password,
      });

      if (response.data.status === 200) {
        const cookie = new Cookies();
        cookie.set("id", response.data.user.id);
        cookie.set("full_name", response.data.user.full_name);
        cookie.set("email", response.data.user.email);
        cookie.set("token", response.data.token);
        cookie.set("role", response.data.user.role);
        router.push("/");
      } else {
        setErrorAlertMessage(response.data.user || "املأ كل الحقول.");
      }
    } catch (err) {
      setErrorAlertMessage("ظهر خطأ غير متوقع.");
    }
  }

  useEffect(() => {
    if (errorAlertMessage) {
      notify();
      setErrorAlertMessage("");
    }
  }, [errorAlertMessage]);
  
  return (
    <>
      <Backdrop>
        <form className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <label htmlFor="email"> الايميل: </label>
          <input
            className="rounded-input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password"> كلمة المرور: </label>
          <input
            className="rounded-input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
          type="button" 
          onClick={handleSubmit} className="btn">
            إنشاء حساب
          </button>
          <Link className="text-blue-500 underline" href="/register/signUp">
            هل لديك حساب من قبل؟
          </Link>
        </form>
      </Backdrop>
      <Toaster />
    </>
  );
}
