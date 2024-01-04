import LayoutDashboard from "@/components/layout/LayoutDashboard"
import { useMessages } from "@/contexts/messages";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/router"; // step 1
import axios from "axios";
import { api_message } from "@/api/APIs";

export default function Message() {
    // for store number from url in next js with useRouter()
    const router = useRouter();  // step 2
    const { id } = router.query // step 3    
    // const messageId = parseInt(id, 10);

    const cookies = new Cookies()
    const { messages, setMessages } = useMessages();
    // the current message
    const [filteredMessage, setFilteredMessage] = useState({
        "id": "",
        "letter": '',
        "sender_email": "",
        "sender_id": "",
        "receiver_id": "",
    })

    useEffect(() => {
        const messageId = parseInt(id, 10);
        if (messages.length > 0) {
            setFilteredMessage(messages.find((MES: any) => MES.id === messageId));
            console.log("filteredMessage: " , filteredMessage );
            console.log( "messageId : " , messageId  );
            console.log("messages: " , messages);
            
            
        }
    }, [messages, id])

    const [letter, setLetter] = useState();

    // handle Message
    async function handleMessage(e: any) {
        e.preventDefault();
        try {
            let res = await axios.post(`${api_message}`,
                {
                    "letter": letter,
                    "sender_email": cookies.get("email"),
                    "sender_id": cookies.get("id"),
                    "receiver_id": filteredMessage.sender_id,
                }
                , {
                    headers: {
                        'Authorization': `token ${cookies.get('token')}`
                    },
                })
            console.log("res: ", res);

        } catch (err) {

        }
    }

    console.log(filteredMessage)

    return (<LayoutDashboard>
        <div className="m-[calc(1rem)] w-full ">
            <div className="bg-backgroundGray rounded-xl p-5 text-xs text-gray-500">
                <div className="">المرسل: { filteredMessage.sender_email} </div>
                <div>
                    {filteredMessage.letter}
                </div>
                <div>
                    created_at
                </div>
            </div>
            <form className="flex justify-center flex-col items-center mt-10">
                <textarea
                    name="letter"
                    onChange={(e) => setLetter(e.target.value)}
                    className="rounded-input rounded-2xl w-1/2  text-gray-500 "
                    placeholder="الموضوع . . ."
                />
                <button
                    onClick={handleMessage}
                    className="btn"
                    >
                    إرسال
                </button>
            </form>
        </div>
    </LayoutDashboard>)
}