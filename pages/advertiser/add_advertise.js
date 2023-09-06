

export default function Add_advertise() {
  return (
    <section
      className="background1 text-slate-500 w-screen h-150% flex flex-col justify-center items-center"
    >
      {/* <Image src={bg} className="absolute -z-10 top-0 bottom-0 right-0 left-0" alt="" width={"100vw"} height={"100vh"} /> */}
      <h1 className="title text-slate-500"> اضافة إعلان: </h1>
      <form className="flex flex-col gap-2 py-7">
        <select
          className="my-3 bg-transparent "
          name="typeDisplay"
        >
          <option value=""> نوع العرض أجار / بيع: </option>
          <option value=""> أجار </option> 
          <option value=""> بيع </option>
        </select>
        <select className="my-3 bg-transparent" name="city">
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
        <label htmlFor="price">أدخل سعر الأستئجار مقابل شهر : </label>
        <input className="rounded-input mb-7" type="number" step={50000} id="price" />
        <label htmlFor="address"> أدخل عنوان العقار:  </label>
        <input className="rounded-input mb-7" type="text" step={50000} id="address" />
        <label htmlFor="mobile"> اكتب رقم جوالك  </label>
        <input id='mobile' className="rounded-input mb-7" />
        <label htmlFor="description"> اكتب لنا أي شيء عن البيت أو ملاحظة أو وصف  </label>
        <textarea className="rounded-input rounded-2xl h-48" id='description' height="300" placeholder="أوصف العقار..." />
       
        
        <button className="w-28 m-auto text-lg  p-2 bg-slate-400 text-white rounded-sm border-2 border-transparent hover:border-2 hover:border-slate-400 hover:bg-white hover:text-slate-400">
          أضفْ
        </button>
      </form>
    </section>
  );
}
