import { useEffect, useState } from "react";
import { Player } from "../../paramModels";
import { useWsClient } from "ws-request-hook";
import {
    ClientLoadPlayersDto, CounterBroadcast, ServerSendsErrorMessageDto,
    ServerUpdateJoinPlayersDto,
    StringConstants
} from "../../generated-client.ts";
import toast from "react-hot-toast";
import { useNavigate, useParams} from "react-router-dom";
import {LobbyPlayer} from "./index.ts";

export const AllPlayers = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const params = useParams();
    const [retrieveInitialPlayers, setInitialPlayers] = useState<boolean>(true);
    const { onMessage, sendRequest, readyState } = useWsClient();
    const navigate =useNavigate();

    useEffect(() => {
        if (!readyState) return;
        if (retrieveInitialPlayers) {
            getCurrentPlayers();
        }
        const unsubscribePlayers = onMessage<ServerUpdateJoinPlayersDto>(
            StringConstants.ServerUpdateJoinPlayersDto,
            (message) => {
                const newPlayers = message.players || [];
                setPlayers(newPlayers);
                toast.success(`Players updated: ${newPlayers.length}`);
            }
        );

        const unsubscribeCounter = onMessage<CounterBroadcast>(
            StringConstants.CounterBroadcast,
            (message) => {
                if (message.startCounter) {
                    navigate("game", { replace: true });
                }
            }
        );

        return () => {
            unsubscribePlayers();
            unsubscribeCounter();
        };
    }, [onMessage,readyState]);

    // const reactToBroadcast = () => {
    //     const unsubscribe = onMessage<ServerUpdateJoinPlayersDto>(
    //         StringConstants.ServerUpdateJoinPlayersDto,
    //         (message) => {
    //             const newPlayers = message.players || [];
    //             console.log("Players broadcast")
    //             console.log(newPlayers);
    //             setPlayers(newPlayers);
    //             toast.success(`Players updated: ${newPlayers.length}`);
    //         }
    //     );
    //     return () => unsubscribe();
    // };
    //
    // const startCounter=()=>{
    //     const unsubscribe = onMessage<CounterBroadcast>(
    //         StringConstants.CounterBroadcast,
    //         (message) => {
    //             if(message.startCounter){
    //                console.log("navigatedtogame")
    //              navigate("game",{replace:true});
    //             }
    //         }
    //     );
    //     return () => unsubscribe;
    // }

    const getCurrentPlayers = async () => {
        const request: ClientLoadPlayersDto = {
            requestId: crypto.randomUUID(),
            eventType: StringConstants.ClientLoadPlayersDto,
            topic: "lobby",
            gameId: params.gameId!
        };

        try {
            console.log("Sending request:", request);
            const response = await sendRequest<ClientLoadPlayersDto, ServerUpdateJoinPlayersDto>(
                request,
                StringConstants.ServerUpdateJoinPlayersDto
            );
            console.log("Response received:", response);
            if (Array.isArray(response.players) && response.players.length > 0) {
                setPlayers(response.players);
                setInitialPlayers(false);
                toast.success(`Current players: ${response.players.length}`);
            } else {
                console.error("Players array is missing or empty:", response.players);
                toast.error("Failed to fetch current players");
            }
        } catch (error) {
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            toast.error(errorDto.error!.toString);
        }
    };

    return (
        <div className="h-1/2 w-1/2 overflow-y-scroll ">
            {players.map((player) => (
            <LobbyPlayer key={player.id} avatarId={player.avatarId} id={player.id} nickname={player.nickname}></LobbyPlayer>
    )
)}
</div>
)
    ;
};
