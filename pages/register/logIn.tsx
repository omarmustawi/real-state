"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { api_login } from "@/api/APIs";

const Backdrop = () => {
  const router = useRouter();
  return (
    <div
      className="bg-opacity-80 bg-slate-100 w-screen h-screen  fixed  flex flex-col justify-center items-center"
      onClick={() => router.push("/")}
    ></div>
  );
};

const Form = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function onLogin(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post(
        api_login,
        {
          "email": user.email,
          "password": user.password,
        }
      );
      console.log("Login success", res);
      const cookie = new Cookies()
      cookie.set("id", res.data.user.id)
      cookie.set("full_name", res.data.user.full_name)
      cookie.set("email", res.data.user.email)
      cookie.set("token", res.data.token)
      cookie.set("role", res.data.user.role)
      router.push("/");
    } catch (err) {
      console.error("Oops! there is an error: ", err);

      // Show an error message to the user using toast or any other method
      toast.error("Failed to log in. Please check your credentials and try again.");
    }
  }

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  return (
    <form
      onSubmit={onLogin}
      className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
    >
      <label htmlFor="email"> الايميل: </label>
      <input
        className="rounded-input"
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
      />
      <label htmlFor="password"> كلمة المرور: </label>
      <input
        className="rounded-input"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="btn"
      >
        تسجيل دخول
      </button>
      <Link className="text-blue-500 underline" href="/register/signUp">
        هل تريد إنشاء حساب جديد؟
      </Link>
    </form>
  );
};
export default function LogIn() {
  return (
    <>
      <Backdrop />
      <Form />
    </>
  );
}
