import { useState } from "react";
import useWebSocket from "react-use-websocket";



const MessageInterface = () => {
    const [newMessage, setNewMessage] = useState<string[]>([""])
    const [message, setMessage] = useState("")
    const socketUrl = "ws://127.0.0.1:8000/ws/test";
    const { sendJsonMessage } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log("connected")
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
            {newMessage.map((msg, index) => {
                return (<div key={index}>{msg}</div>)
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