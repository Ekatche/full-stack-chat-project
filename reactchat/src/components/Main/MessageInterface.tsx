import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../hooks/useCuds";
import { server } from "../../@types/server.d";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography, useTheme } from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfanceCannels";
import Scroll from "./Scroll";


interface SendMessageData {
    type: string;
    message: string;
    [key: string]: any;
}

interface ServerChannelProps {
    data: server[];
}
interface Message {
    sender: string;
    content: string;
    created_at: string;
}


const MessageInterface = (props: ServerChannelProps) => {
    const { data } = props;
    const [newMessage, setNewMessage] = useState<Message[]>([])
    const [message, setMessage] = useState("")
    const theme = useTheme();
    // optionnal chaining to access the name property, it checks if the property exists before accessing it 
    const server_name = data?.[0]?.name ?? "Server"
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
                    setMessage("");
                } else {
                    console.warn("Unexpected message format", data);
                }
            } catch (e) {
                console.error("Failed to parse message", msg.data, e);
            }
        }
    })

    const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendJsonMessage({ type: "message", message } as SendMessageData);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendJsonMessage({ type: "message", message } as SendMessageData);
    }

    function formatTimeStamp(created_at: string) {
        const date = new Date(Date.parse(created_at));
        const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const formatedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        return `${formatedDate} - ${formatedTime}`;
    }

    return <>
        <MessageInterfaceChannels data={data} />
        {channelId == undefined ? (
            <Box sx={{
                overflow: "hidden",
                p: { xs: 0 },
                height: `calc(80vh)`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" fontWeight={700} letterSpacing={"-.5px"}
                        sx={{ px: 5, maxWidth: "600px" }}>
                        Welcome to {server_name}
                    </Typography>
                    <Typography>
                        {
                            data?.[0]?.description ?? "This is our home"
                        }
                    </Typography>
                </Box>

            </Box>) :
            (
                <>
                    <Box sx={{ overflow: "hidden", p: 0, height: `calc(100vh-100px)` }} >
                        <Scroll>
                            <List
                                sx={{ with: "100%", bgcolor: "background.paper" }}
                            >
                                {
                                    newMessage.map((msg: Message, index: number) => {
                                        return (
                                            <ListItem key={index} alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt="user image" />

                                                </ListItemAvatar>
                                                <ListItemText
                                                    primaryTypographyProps={{
                                                        fontSize: "12px",
                                                        variant: "body2"
                                                    }}
                                                    primary={
                                                        <>
                                                            <Typography
                                                                component={"span"}
                                                                variant="body1"
                                                                color="text.primary"
                                                                sx={{ display: "inline", fontW: 600 }}
                                                            >
                                                                {msg.sender}
                                                            </Typography>
                                                            <Typography
                                                                component={"span"}
                                                                variant="caption"
                                                                color="textSecondary"
                                                            >
                                                                {" at "}
                                                                {formatTimeStamp(msg.created_at)}

                                                            </Typography>
                                                        </>

                                                    }
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                variant="body1"
                                                                style={{
                                                                    overflow: "hidden",
                                                                    whiteSpace: "normal",
                                                                    textOverflow: "clip",
                                                                }}
                                                                sx={{
                                                                    display: "inline",
                                                                    lineHeight: 1.2,
                                                                    fontWeight: 400,
                                                                    letterSpacing: "-0.2px",
                                                                }}
                                                                component={"span"}
                                                                color="text.primary"
                                                            >
                                                                {msg.content}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    })
                                }
                            </List>
                        </Scroll>

                    </Box>
                    <Box
                        sx={{ position: "sticky", bottom: 0, width: "100%" }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            style={{
                                bottom: 0, right: 0, padding: "1rem",
                                backgroundColor: theme.palette.background.default,
                                zIndex: 1
                            }}>
                            <Box sx={{ display: "flex" }}>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={message}
                                    minRows={1}
                                    maxRows={4}
                                    sx={{ flexGrow: 1 }}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handlekeyDown}
                                />
                            </Box>
                        </form>
                    </Box>
                </>
            )
        }
    </>
};
export default MessageInterface; 