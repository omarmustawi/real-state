import RealEstate from "@/components/RealEstate/RealEstate";
import { useState } from "react";
import info from "../../public/data.json";



export default function Search_about_real_estate() {
  const data = info.RealEstates;
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  return (
    <section className="bg-backgroundcolor">
      <section className="background1 top-28 relative flex justify-center items-center flex-col text-slate-700">
        <div
          style={{
            boxShadow: "rgb(204, 204, 204) 8px 5px 14px 0px",
            background:
              "linear-gradient(to right, rgb(148 163 184 / 25%), rgb(139 176 228 / 79%))",
            padding: "2rem",
            borderRadius: "7px",
            width: "400px",
          }}
          className="border-gray-300 border-2"
        >
          <h1 className="title text-center text-slate-600">
            البحث عن عقار مناسب:
          </h1>
          <form
            className="flex flex-col gap-2 py-7"
          >
            <select
              className="my-3 bg-transparent"
              name="typeSearch"
            >
              <option value=""> اختر نوع البحث استئجار / شراء: </option>
              <option value=""> استئجار </option>
              <option value=""> شراء </option>
            </select>
            <select
              className="my-3 bg-transparent"
              name="city"
            >
              <option value=""> اختر المدينة: </option>
              <option value="الحسكة">الحسكة</option>
              <option value="دير الزور">دير الزور</option>
              <option value="الرقة">الرقة</option>
              <option value="حلب">حلب</option>
              <option value="إدلب">إدلب</option>
              <option value="اللاذقية">اللاذقية</option>
              <option value="طرطوس">طرطوس</option>
              <option value="حماة">حماة</option>
              <option value="دمشق">دمشق</option>
              <option value="ريف دمشق"> ريف دمشق</option>
              <option value="حمص">حمص</option>
              <option value="درعا">درعا</option>
              <option value="القنيطرة">القنيطرة</option>
              <option value="سويداء">سويداء</option>
            </select>
            <select
              className="my-3 bg-transparent"
              name="typeRealEstate"
            >
              <option value=""> اختر نوع العقار الذي تريد أن تبحث عنه: </option>
              <option value=""> منزل </option>
              <option value=""> محل تجاري </option>
              <option value=""> فيلّا </option>
            </select>
            <label htmlFor="priceMin">
              أدخل الحدالأدنى لميزانيتك: {priceMin}
            </label>
            <input
              className="mb-7"
              type="range"
              step={50000}
              id="priceMin"
              min={75000}
              max={3000000}
              onChange={() =>
                setPriceMin( (document.getElementById("priceMin")).value)
              }
            />
            <label htmlFor="priceMax">
              أدخل الحدالأعلى لميزانيتك: {priceMax}
            </label>
            <input
              className="mb-7"
              type="range"
              step={50000}
              id="priceMax"
              min={75000}
              max={3000000}
              onChange={() =>
                setPriceMax(document.getElementById("priceMax")!.value)
              }
            />
            <button 
            className="btn">
              ابحث
            </button>
          </form>
        </div>
      </section>
      <div className="bg-backgroundcolor background2 relative -bottom-56">
        <h1 className="text-center m-auto text-4xl text-slate-600">
          نتائج البحث:
        </h1>
        <div className="text-center">
          {data.map((realEstate, index) => (
            <RealEstate
              key={index}
              kindOfRealEstate={realEstate.kindOfRealEstate}
              city={realEstate.city}
              location={realEstate.location}
              description={realEstate.description}
              price={realEstate.price}
              mobileNum={realEstate.mobileNum}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
