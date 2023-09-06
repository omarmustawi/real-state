"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/nextjs/users/signup", user);
      console.log("run");
      console.log(user);
      console.log("Signup success", response.data);
      // router.push("/logIn");
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    }
  };

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <form 
    onSubmit={onSignup}
    className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <label htmlFor="name"> الاسم الكامل: </label>
      <input
        className="outline-none focus:border-blue-300 border-2 rounded-3xl p-2 mb-5 "
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
      />
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
      <label htmlFor="confirmPassword"> تأكيد كلمة المرور: </label>
      <input
        className="outline-none focus:border-blue-300 border-2 rounded-3xl p-2 mb-5"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        onChange={handleChange}
      />
      <button
      type="submit"
        className="mt-6 m-auto text-lg  p-2 bg-slate-400 text-white rounded-xl border-2 border-transparent hover:border-2 hover:border-slate-400 hover:bg-white hover:text-slate-400"
      >
        إنشاء حساب
      </button>
      <Link className="text-blue-500 underline" href="/register/logIn">
        هل لديك حساب من قبل؟
      </Link>
    </form>
  );
};

export default function SignUp() {
  return (
    <>
      <Backdrop />
      <Form />
    </>
  );
}
