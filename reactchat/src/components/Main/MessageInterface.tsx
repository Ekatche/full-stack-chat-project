import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCuds";
import { server } from "../../@types/server.d";

interface Message {
    sender: string;
    content: string;
    timestamp: string;
}

const MessageInterface = () => {
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState("")
    const { serverId, channelId } = useParams();

    const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;
    const { fetchData } = useCrud<server>([], `/messages/?channel_id=${channelId}`);


    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: async () => {
            try {
                const data = await fetchData();
                setNewMessage([]);
                setNewMessage(Array.isArray(data) ? data : []);
                console.log("connected")
            } catch (e) {
                console.error("Failed to fetch data", e);
            }
        },
        onClose: () => {
            console.log("Closed")
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (msg) => {
            console.log(msg);

            try {
                const data = JSON.parse(msg.data);
                console.log(data);

                if (data && data.new_message) {
                    setNewMessage(prev_msg => [...prev_msg, data.new_message]);
                } else {
                    console.warn("Unexpected message format", data);
                }
            } catch (e) {
                console.error("Failed to parse message", msg.data, e);
            }
        }
    })

    return (
        <div>
            {newMessage.map((msg: Message, index: number) => {
                return (<div key={index}>
                    <p>{msg.sender}</p>
                    <p>{msg.content}</p>
                </div>)
            }
            )}
            <form>
                <label>
                    Enter Message :
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>
            </form>
            <button onClick={() => { sendJsonMessage({ type: "message", message }) }}>
                Send Message
            </button>

        </div>
    )
};
export default MessageInterface; 