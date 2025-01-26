import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDraw from "./templates/PrimaryDraw";
import SecondaryDraw from "./templates/SecondaryDraw";
import Main from "./templates/Main";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDraw/UserServer";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { server } from "../@types/server.d";
import useCrud from "../hooks/useCuds";
import { useEffect } from "react";

/**
 * Represents a component that renders the server page.
 * 
 * This component fetches server data based on the serverId parameter from the URL and renders the server interface.
 * It also checks if the channelId parameter is provided and verifies if the server has a channel with that ID.
 * If there is an error or the server does not have the specified channel, it redirects the user to the home page.
 */
/**
 * Represents a server component.
 */

const Server = () => {
    const navigate = useNavigate();
    const { serverId, channelId } = useParams();
    const { dataCRUD, error, isLoading, fetchData } = useCrud<server>([], `/server/select/?by_serverid=${serverId}`);

    if (error !== null && error.message === "400") {
        console.log(error);
        navigate("/");
        return null
    }

    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Checks if the current channel is valid.
     * @returns {boolean} True if the channel is valid, false otherwise.
     */

    const isChannel = (): boolean => {
        if (!channelId) {
            return true;
        }
        return dataCRUD.some((server) =>
            server.channel_server.some(
                (channel) => channel.id === parseInt(channelId)
            )
        );
    };
    useEffect(() => {
        if (!isChannel()) {
            navigate(`server/${serverId}`);
        }
    }, [isChannel, channelId]);


    return (
        <Box sx={{ display: "flex" }}>

            <CssBaseline />
            <PrimaryAppBar />
            <PrimaryDraw >
                <UserServers open={false} data={dataCRUD} />
            </PrimaryDraw>
            <SecondaryDraw>
                <ServerChannels data={dataCRUD} />
            </SecondaryDraw>
            <Main>
                <MessageInterface data={dataCRUD} />
            </Main>
        </Box>
    )
}
export default Server; 