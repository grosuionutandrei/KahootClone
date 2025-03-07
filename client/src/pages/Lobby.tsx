import {Avatars} from "../components/Lobby";
import {useEffect, useState} from "react";
import {
    ClientAddsPlayerInfoDto, ClientLoadsPlayersNumberDto, ClientRetrieveAvatarDto,
    ServerConfirmsDto, ServerSendsAvatarList,
    ServerSendsErrorMessageDto, ServerUpdatePlayersDto,
    StringConstants
} from "../generated-client.ts";
import {Avatar} from "../paramModels";
import {useWebSocketWithRequests, useWsClient} from "ws-request-hook";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {SetPlayerAtom, ShowAvatarAtom} from "../atoms/generalAtoms.ts";
import {AvatarImagesAtom, PlayersAtom} from "../atoms";
import {useClientIdState} from "../hooks";
import {KEYS} from "../hooks/keys";
export const Lobby = () => {
    const manageClientId= useClientIdState(KEYS.CLIENT_ID);
    const [images,setImages] = useState<Avatar[]>([])
    const [clientId,setClientId] = useState(manageClientId.getClientId());
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [savedPlayer, setPlayer] = useAtom(SetPlayerAtom);
    const [players, setPlayers] = useAtom(PlayersAtom);
    const params = useParams();
    const [user, setUser] = useState<ClientAddsPlayerInfoDto>({
        id: clientId!,
        nickname: "",
        avatarId: "",
        gameId: params.gameId!.toString()
    })
    useEffect(() => {
        if (!readyState) return;
        fetchCurrentPlayers();
        getAvatars();
        reactToBroadcasts();
    }, [onMessage,readyState]);

    const fetchCurrentPlayers = async () => {
        var topic:ClientLoadsPlayersNumberDto ={
             topic:"lobby",
            eventType: StringConstants.ClientLoadsPlayersNumberDto
        }
        try {
            const response = await sendRequest<ClientLoadsPlayersNumberDto, ServerUpdatePlayersDto>(
                topic,
                StringConstants.ServerUpdatePlayersDto
            );
            if (response?.players) {
                setPlayers(response.players);
                toast.success(`Current players: ${response.players}`);
            } else {
                toast.error("Failed to fetch current players");
            }
        } catch (error) {
            toast.error("Error fetching players");
        }
    };


    const retrieveAvatar = (avatar: Avatar) => {
        setUser((prevState) => ({...prevState, avatarId: avatar.id}))
    }

    const getNickName = (nickName: string) => {
        setUser((prevState) => ({...prevState, nickname: nickName}))
    }

    const clientSetsUserAvatar = async () => {
        if (user.nickname === "") {
            toast.error("insert a nick name");
            return;
        }
        const request: ClientAddsPlayerInfoDto = {
            id: user.id,
            nickname: user.nickname,
            avatarId: user.avatarId,
            gameId: user.gameId,
            requestId: crypto.randomUUID().toString(),
            eventType: StringConstants.ClientAddsPlayerInfoDto
        }

        try {
            const signInResult: ServerConfirmsDto = await sendRequest<ClientAddsPlayerInfoDto, ServerConfirmsDto>(request, StringConstants.ServerConfirmsDto).finally(() => console.log("er"));
            if (signInResult?.success && signInResult.requestId === request.requestId) {
                setPlayer({
                    avatarId: request.avatarId,
                    nickname: request.nickname
                })
            }
        } catch (error) {
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            let message = "";
            if (errorDto.error == null) {
                message = "An error Occurred";
            } else {
                message = errorDto.error
            }
            toast.error(message);
        }
    }

    const reactToBroadcasts = async () => {
        const unsubscribe = onMessage<ServerUpdatePlayersDto>(
            StringConstants.ServerUpdatePlayersDto,
            (message) => {
                const res = message.players || 0;
                const images: Avatar[] = message.avatars?.map((path) => ({ id: path, path })) || [];
                setImages(images);
                toast.success(`Players updated: ${res} + ${images}`);
                setPlayers(message.players || 0);
            }
        );
        return () => unsubscribe();
    }

  const getAvatars = async ()=>{
        var request:ClientRetrieveAvatarDto={
            requestId:crypto.randomUUID(),
            eventType:StringConstants.ClientRetrieveAvatarDto,
            gameId:params.gameId!.toString()
        }

      try {
          const getImages: ServerSendsAvatarList = await sendRequest<ClientRetrieveAvatarDto, ServerSendsAvatarList>(request, StringConstants.ServerSendsAvatarList).finally(() => console.log("er"));
          if (getImages.requestId === request.requestId) {
              const images: Avatar[] = getImages.paths?.map((path) => ({ id: path, path })) || [];
              setImages(images);
              toast.success("Images retrieved" + images.length);
          }
      } catch (error) {
          const errorDto = error as unknown as ServerSendsErrorMessageDto;
          let message = "";
          if (errorDto.error == null) {
              message = "An error Occurred";
          } else {
              message = errorDto.error
          }
          toast.error(message);
      }
  }
    return (
        <div className={"w-screen h-screen flex flex-col justify-center items-center bg-blue-300"}>
            <h2 className={"m-1 text-white text-3xl"}>Please chose an avatar</h2>
            <div className={"w-1/3 h-1/4 flex flex-wrap justify-between items-center overflow-y-scroll bg-blue-150"}>
                <Avatars getSelectedAvatar={retrieveAvatar} images={images} ></Avatars>
            </div>
            <input onChange={(e) => getNickName(e.target.value)} type="text" value={user.nickname}
                   placeholder="type your nickname" className="mt-20 input input-neutral"/>
            <button className=" m-1 btn btn-active bg-orange-600 text-white" onClick={clientSetsUserAvatar}>Submit
            </button>
        </div>
    )

}