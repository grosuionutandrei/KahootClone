import {useEffect, useState} from "react";
import {Avatar, Player} from "../../paramModels";
import {useWsClient} from "ws-request-hook";
import {ServerUpdatePlayersDto, StringConstants} from "../../generated-client.ts";
import toast from "react-hot-toast";

export const AllPlayers=()=>{
  const [players,setPlayers]= useState<Player[]>();
  const {onMessage, sendRequest, send, readyState} = useWsClient();
  const [reactToMessages,setReactToMessages] = useState<string>("ServerUpdatePlayers");


    useEffect(() => {
        if(!readyState)return

    }, [readyState]);




    const reactToBroadcast=()=>{
        const unsubscribe = onMessage<ServerUpdateJoinPlayers>(
            StringConstants.ServerUpdatePlayersDto,
            (message) => {
                const res =
                const images: Avatar[] = message.avatars?.map((path) => ({ id: path, path })) || [];
                setImages(images);
                toast.success(`Players updated: ${res} + ${images}`);
                setPlayers(message.players || 0);
            }
        );
        return () => unsubscribe();
    }

    return (
        <div className={"h-1/2 w-1/2 overflow-y-scroll"}>

        </div>
    )
}