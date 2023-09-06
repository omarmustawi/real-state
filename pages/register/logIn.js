"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

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
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    }
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  console.log("User: ", user);
  return (
    <form className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <label htmlFor="email"> الايميل: </label>
      <input
        className="outline-none focus:border-blue-300 border-2 rounded-3xl p-2 mb-5"
        type="email"
        id="email"
        name="email"
        onChange={handleChange}
      />
      <label htmlFor="password"> كلمة المرور: </label>
      <input
        className="outline-none focus:border-blue-300 border-2 rounded-3xl p-2 mb-5"
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={onLogin} className="mt-6 m-auto text-lg  p-2 bg-slate-400 text-white rounded-xl border-2 border-transparent hover:border-2 hover:border-slate-400 hover:bg-white hover:text-slate-400">
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
