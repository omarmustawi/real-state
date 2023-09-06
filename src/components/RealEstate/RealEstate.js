export default function RealEstate({
  kindOfRealEstate,
  city,
  location,
  description,
  mobileNum,
  price,
}) {
  return (
    <section className="p-10 text-slate-600 m-4 bg-gradient-to-tr from-slate-50 to-slate-400 rounded-lg w-1/4 inline-block shadow-slate-300 shadow-xl">
      <strong>
        {kindOfRealEstate} : في {city} - {location}
      </strong>
      <div> {description} </div>
      <div> للتواصل مع المعلن: {mobileNum} </div>
      <strong>
        الأجر: <span className="-tracking-tighter"> {price} </span> ليرة سوري في
        الشهر.
      </strong>
      <button className="block w-28 mt-6 m-auto text-lg  p-2 bg-slate-400 text-white rounded-2xl border-2 border-transparent hover:border-2 hover:border-slate-400 hover:bg-white hover:text-slate-400">
        اقرأ أكثر..
      </button>
    </section>
  );
}
