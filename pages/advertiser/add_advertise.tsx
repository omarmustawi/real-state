import { api_add_list_property } from "@/api/APIs";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Add_advertise() {
  const cookie = new Cookies();
  const [type_deal, set_type_deal] = useState("");
  const [city, set_city] = useState("");
  const [price, set_price] = useState("");
  const [num_room, set_num_room] = useState("");
  const [space, set_space] = useState("");
  const [address, set_address] = useState("");
  const [phone, set_phone] = useState("");
  const [description, set_description] = useState("");
  const [property_type, set_property_type] = useState("");
  const [images, set_images] = useState<File | string>("");

  const [errorAlertMessage, setErrorAlertMessage] = useState<string>("");
  const [onClickSubmit, setOnClickSubmit] = useState<boolean>(false);

  async function handleAddAdvertise(e: any) {
    setOnClickSubmit(!onClickSubmit);
    if (
      type_deal === "" ||
      city === "" ||
      price === "" ||
      property_type === "" ||
      phone === "" ||
      description === "" ||
      space === "" ||
      address === "" ||
      images === "" ||
      (num_room === "" && (property_type === "0" || property_type === "3"))
    ) {
      setErrorAlertMessage(
        " حدث خطأ غير متوقع، أعد ارسال الطلب، تأكد من ملء جميع الحقول"
      );
      return;
    }
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("type_deal", type_deal);
      form.append("city", city);
      form.append("price", price);
      if (["0", "3"].includes(property_type)) {
        form.append("num_room", num_room);
      }
      form.append("space", space);
      form.append("address", address);
      form.append("phone", phone);
      form.append("description", description);
      form.append("type_property", property_type);
      form.append("images", images);
      form.append("adviser", cookie.get("id"));
      form.append("is_alive", "true");
      await axios
        .post(`${api_add_list_property}`, form, {
          headers: {
            Authorization: `token ${cookie.get("token")}`,
          },
        })
        .then((res) => {
          console.log("res: ", res);
          if (res.data.status === 200) {
            setErrorAlertMessage(" تمت العملية بنجاح");
          } else {
            setErrorAlertMessage(
              " حدث خطأ غير متوقع، أعد ارسال الطلب، "
            );
          }
        });
    } catch (err) {
      console.error("error: ", err);
    }
  }

  const notify = () => toast(errorAlertMessage);
  useEffect(() => {
    if (errorAlertMessage) {
      notify();
      setErrorAlertMessage("");
    }
  }, [errorAlertMessage, onClickSubmit]);
  return (
    <section className="background1 text-slate-500 w-screen pt-28 flex flex-col justify-center items-center">
      <Toaster />
      <h1 className="title text-slate-500"> اضافة إعلان: </h1>
      <form encType="multipart/form-data" className="flex flex-col gap-2 py-7">
        <select
          onChange={(e) => set_type_deal(e.target.value)}
          className="my-3 bg-transparent "
          name="typeDisplay"
        >
          <option value=""> نوع العرض أجار / بيع: </option>
          <option value={"false"}> أجار </option>
          <option value={"true"}> بيع </option>
        </select>
        <select
          onChange={(e) => set_city(e.target.value)}
          className="my-3 bg-transparent"
          name="city"
        >
          <option value=""> اختر المدينة: </option>
          <option value={"الحسكة"}>الحسكة</option>
          <option value={"دير الزور"}>دير الزور</option>
          <option value={"الرقة"}>الرقة</option>
          <option value={"حلب"}>حلب</option>
          <option value={"إدلب"}>إدلب</option>
          <option value={"اللاذقية"}>اللاذقية</option>
          <option value={"طرطوس"}>طرطوس</option>
          <option value={"حماة"}>حماة</option>
          <option value={"دمشق"}>دمشق</option>
          <option value={"ريف دمشق"}> ريف دمشق</option>
          <option value={"حمص"}>حمص</option>
          <option value={"درعا"}>درعا</option>
          <option value={"القنيطرة"}>القنيطرة</option>
          <option value={"سويداء"}>سويداء</option>
        </select>
        <select
          onChange={(e) => set_property_type(e.target.value)}
          className="my-3 bg-transparent"
          name="typeRealEstate"
        >
          <option value=""> اختر نوع العقار : </option>
          <option value={0}> منزل </option>
          <option value={1}> أرض زراعية </option>
          <option value={2}> محل تجاري </option>
          <option value={3}> فيلّا </option>
        </select>
        <label htmlFor="price">أدخل سعر الأستئجار مقابل شهر : </label>
        <input
          onChange={(e) => set_price(e.target.value)}
          className="rounded-input mb-7"
          type="number"
          step={50000}
          id="price"
          min="50000"
        />
        {["0", "3"].includes(property_type) && (
          <>
            {" "}
            <label htmlFor="num_room">أدخل عدد الغرف: </label>
            <input
              onChange={(e) => set_num_room(e.target.value)}
              className="rounded-input mb-7"
              type="number"
              id="num_room"
              min="1"
            />{" "}
          </>
        )}
        <label htmlFor="space">أدخل المساحة: </label>
        <input
          onChange={(e) => set_space(e.target.value)}
          className="rounded-input mb-7"
          type="number"
          id="space"
          min="50"
        />
        <label htmlFor="address"> أدخل عنوان العقار: </label>
        <input
          onChange={(e) => set_address(e.target.value)}
          className="rounded-input mb-7"
          type="text"
          step={50000}
          id="address"
        />
        <label htmlFor="mobile"> اكتب رقم جوالك </label>
        <input
          onChange={(e) => set_phone(e.target.value)}
          id="mobile"
          className="rounded-input mb-7"
        />
        <label htmlFor="description">
          {" "}
          اكتب لنا أي شيء عن البيت أو ملاحظة أو وصف{" "}
        </label>
        <textarea
          onChange={(e) => set_description(e.target.value)}
          className="rounded-input rounded-2xl h-48"
          id="description"
          placeholder="أوصف العقار..."
        />
        <label htmlFor="images">ادخل صور عن العقار:</label>
        {/* <input onInput={(e) => set_images(e.target.value)} id="images" type="file" /> */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            set_images(
              e.target.files && e.target.files.length > 0
                ? e.target.files[0]
                : ""
            )
          }
          id="images"
        />

        <button onClick={handleAddAdvertise} type="button" className="btn">
          أضفْ
        </button>
      </form>
    </section>
  );
}
