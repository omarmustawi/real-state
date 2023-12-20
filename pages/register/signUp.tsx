"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { api_signup } from "@/api/APIs";
import { toast } from "react-toastify";

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
    // confirmPassword: "",
  });

  function handleChange(e: any) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // HANDLE REGISTER
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post(
        api_signup,
        {
          "full_name": user.name,
          "email": user.email,
          "password": user.password,
        }
      );
      console.log("res register: ", response);

      //  Check for success status or handle other scenarios
      if (response.data.status === 201) {
        // User registered successfully, you might want to redirect or show a success message
        router.push('/register/logIn')
      } else {
        // Handle other scenarios
        console.log("errro", response.data.error.email);
        if (response.data.error.email === undefined) toast.error("Failed to register. Please try again.");
      }
    } catch (err) {
      console.error("Oops! there is an error: ", err);
      // Show an error message to the user using toast or any other method
      toast.error("Failed to register. Please try again.");
    }
  }

  return (
    <form className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
      <label htmlFor="name"> الاسم الكامل: </label>
      <input
        className="rounded-input"
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
      />
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
      <label htmlFor="confirmPassword"> تأكيد كلمة المرور: </label>
      <input
        className="rounded-input"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
      // onChange={handleChange}
      />
      <button
        // type="submit"
        onClick={handleSubmit}
        className="btn"
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
