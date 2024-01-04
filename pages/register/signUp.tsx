"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_signup } from "@/api/APIs";
import toast, { Toaster } from "react-hot-toast";

function Backdrop({ children }: any) {
  return (
    <div className="bg-opacity-80 bg-slate-100 w-screen h-screen  fixed  flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //  for Alert
  const [errorAlertMessage, setErrorAlertMessage] = useState("");
  const [onClickSubmit, setOnClickSubmit] = useState(false);
  const notify = () => toast(errorAlertMessage);

  // HANDLE REGISTER
  async function handleSubmit(e: React.FormEvent) {
    setOnClickSubmit(!onClickSubmit);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorAlertMessage("كلمتي السر غير متطابقتين.");
      return;
    }

    try {
      const response = await axios.post(api_signup, {
        full_name: name,
        email,
        password,
      });
      if (response.data.status === 201) {
        router.push("/register/logIn");
      } else {
        if (response.data.error?.email[0] === "Enter a valid email address.") {
          setErrorAlertMessage("ادخل ايميل صالح");
        } else if (
          response.data.error?.email[0] ===
          "user with this email already exists."
        ) {
          setErrorAlertMessage("الحساب موجود مسبقاً");
        } else {
          setErrorAlertMessage("املأ كل الحقول.");
        }
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
  }, [errorAlertMessage, onClickSubmit]);

  return (
    <>
      <Backdrop>
        <form className="w-96 text-slate-600 bg-slate-200 flex flex-col p-7 rounded-2xl gap-3 border-2 border-slate-300 shadow-xl fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          <label htmlFor="name"> الاسم الكامل: </label>
          <input
            className="rounded-input"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label htmlFor="confirmPassword"> تأكيد كلمة المرور: </label>
          <input
            className="rounded-input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="btn"
          >
            إنشاء حساب
          </button>
          <Link className="text-blue-500 underline" href="/register/logIn">
            هل لديك حساب من قبل؟
          </Link>
        </form>
      </Backdrop>
      <Toaster />
    </>
  );
}
