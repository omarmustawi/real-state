import Image from 'next/image';
import myImage from "../../public/myImage.png";
import bg from "../../public/bg1.jpg";
import { FaSquareFacebook, FaTelegram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import axios from "axios";
import { api_message } from "@/api/APIs";
import { useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';

export default function About_us() {
  const cookies = new Cookies()
  const [message, setMessage] = useState({
    "letter": "",
    "sender_email": cookies.get("email"),
    "sender_id": cookies.get('id'),
    "receiver_id": 1,
  });

  function handleChange(e: any) {
    setMessage(
      { ...message, [e.target.name]: e.target.value }
    )
  }



  // handle Message
  async function handleMessage(e: any) {
    e.preventDefault();
    try {
      let res = await axios.post(`${api_message}`, message, {
        headers: {
          'Authorization': `token ${cookies.get('token')}`
        },
      })
      console.log("res: ", res);

    } catch (err) {

    }
  }


  return (
    <section className="w-full h-full background2">
      <Image
        src={bg}
        className="-z-20 absolute w-100 h-100"
        // width={"100%"}
        // height={"100%"}
        alt="bg"
      />
      <section>
        <div className="flex justify-center">
          <div className="m-36">
            {/* info about me */}
            <div className="flex justify-center items-center">
              <Image
                src={myImage}
                alt="myImage"
                width={200}
                className=" bg-gradient-to-tr from-pink-400  to-orange-200 rounded-full"
              />
              <div className="mr-10">
                <h1 className="title"> معلومات عن المؤسس: </h1>
                <p className="paragraph mr-0">
                  اسمي عمر أحمد مصطاوي، مبرمج وطالب IT بكالوريوس قسم الذكاء الصنعي لدي خبرة سنتين في
                  تطوير مواقع الويب، اشتغلت عدة مشاريع، ولكن هذه المره الأولى
                  التي أفكر في تصميم منصة هدفها تسهيل البحث عن عقار سواءاً
                  للأجار .أو للشراء، هدفي هو تقديم خدمة لأبناء بلدي في حدود ما
                  أعرف
                </p>
                <h1 className="title text-lg"> تواصل معي من خلال: </h1>
                <div className="flex gap-8 w-fit m-auto">
                  <a
                    href="https://www.facebook.com/omar.mestawi/"
                    target="_blank"
                  >
                    <FaSquareFacebook size={30} color="#334155" />
                  </a>
                  <a href="https://t.me/omar_mustawy" target="_blank">
                    <FaTelegram size={30} color="#334155" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=+963931886477&text=Hello, more information!"
                    target="_blank"
                  >
                    <IoLogoWhatsapp size={30} color="#334155" />
                  </a>
                </div>
              </div>
            </div>
            {/* info about the use */}
            <div className="mt-16">
              <h1 className="title">كيف أحقق الاستفادة من الموقع:</h1>
              <p className="paragraph">
                👈إذا كنت تبحث عن بيت لتشتريه أو لتستأجره أو حتى محل تجاري أيضاً
                ما عليك سوى أن تملئ المعلومات المطلوبة في الفورم ونحن سنتولى
                الأمر.
              </p>
              <p className="paragraph">
                {" "}
                👈أيضاً في حالة عدم توفر طلبك الآن في الداتا بيز خاصتنا سنحتفظ
                بطلبك ريثما يتوفر وعندها سنرسل لك إيميل بذلك فورياً
              </p>
              <p className="paragraph">
                👈 إذا كان لديك بيت أو محل تجاري تريد عرضه للأجار أو للبيع فإنّ
                منصتنا هي الحل الأمثل لذلك 😉 .
              </p>
              <strong className="mb-4 text-slate-700">
                {" "}
                "وفّر مالك ولا تهدره في المكاتب العقارية"{" "}
              </strong>
            </div>
            {/* Warnings */}
            <div className="mt-16">
              <h1 className="title"> تحذيرات: </h1>
              <p className="paragraph">
                {" "}
                👈 يمنع نشر إعلانات كاذبة وفي حال التكرار سيحظر المستخدم من
                الخدمة.{" "}
              </p>
              <p className="paragraph"> 👈 يمنع نشر إعلانات بمعلومات وهمية. </p>
            </div>

            <div className="mt-16 ">
              <h1 className="title"> لإبلاغنا عن أي مشكلة تواجهك: </h1>
              <form className="flex flex-col justify-center items-center gap-8">
                <input
                  name="sender_email"
                  onChange={handleChange}
                  className="rounded-input w-1/2 "
                  type="text"
                  placeholder="ايميلك..."
                />
                <textarea
                  name="letter"
                  onChange={handleChange}
                  className="rounded-input rounded-2xl w-1/2 h-48 "
                  placeholder="الموضوع . . ."
                />
                <button
                  onClick={handleMessage}
                  className='btn'>
                  إرسال
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
