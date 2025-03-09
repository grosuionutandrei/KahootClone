import {Avatars} from "../components/Lobby";
import {useEffect, useRef, useState} from "react";
import {
    ClientAddsPlayerInfoDto, ClientLoadsPlayersNumberDto, ClientRetrieveAvatarDto,
    ServerConfirmsDto, ServerSendsAvatarList,
    ServerSendsErrorMessageDto, ServerSendsInitialPlayers, ServerUpdatePlayersDto,
    StringConstants
} from "../generated-client.ts";
import {Avatar} from "../paramModels";
import {useWebSocketWithRequests, useWsClient} from "ws-request-hook";
import toast from "react-hot-toast";
import {replace, useLocation, useNavigate, useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {SetPlayerAtom, ShowAvatarAtom} from "../atoms/generalAtoms.ts";
import {AvatarImagesAtom, PlayersAtom} from "../atoms";
import {useClientIdState} from "../hooks";
import {KEYS} from "../hooks/keys";
export const Lobby = () => {
    const manageClientId= useClientIdState(KEYS.CLIENT_ID);
    const [_,setAvatar]= useAtom(ShowAvatarAtom);
    const hasFetchedAvatars = useRef(false);
    const hasFetchedInitialPlayers = useRef(false);
    const [images,setImages] = useState<Avatar[]>([])
    const [clientId,setClientId] = useState(manageClientId.getClientId());
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [savedPlayer, setPlayer] = useAtom(SetPlayerAtom);
    const [players, setPlayers] = useAtom(PlayersAtom);
    const [pageRequest,setPageRequest] = useState<string[]>([])
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<ClientAddsPlayerInfoDto>({
        id: clientId!,
        nickname: "",
        avatarId: "",
        gameId: params.gameId!.toString()
    })

    useEffect(() => {
        toast.error(readyState+"not before");
        if (!readyState) return;
        if(!hasFetchedAvatars.current){
           toast.success("Fetching avatars");
           getAvatars();
       }
        if(!hasFetchedInitialPlayers.current){
            toast.success("Fetching initial players");
            fetchCurrentPlayers();
        }
        reactToBroadcasts();
        toast.error(readyState+" before");
        }, [onMessage,readyState]);

    const fetchCurrentPlayers = async () => {
        const request:ClientLoadsPlayersNumberDto ={
            requestId:crypto.randomUUID(),
            topic:"lobby",
            gameId:params.gameId!,
            eventType: StringConstants.ClientLoadsPlayersNumberDto
        }
        try {
               const response:ServerSendsInitialPlayers = await sendRequest<ClientLoadsPlayersNumberDto, ServerSendsInitialPlayers>(
                request,
                StringConstants.ServerSendsInitialPlayers
            );
            if (response.requestId===request.requestId) {
                setPlayers(response.players!);
                hasFetchedInitialPlayers.current=true;
                toast.success(`Current players: ${response.players}`);
            } else {
                toast.error("Failed to fetch current players");
            }
        } catch (error) {
            console.error("Request failed:", error);
            if (error instanceof Error) {
                console.error("Error message:", error.message);
            }
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            let message = errorDto?.error ?? "An error occurred, but no error message was provided.";
            console.error(error + " error response");
            toast.error(message);
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
            console.log("Sending request:", request);
            const signInResult: ServerConfirmsDto = await sendRequest<ClientAddsPlayerInfoDto, ServerConfirmsDto>(request, StringConstants.ServerConfirmsDto).finally(() => console.log("er"));
            console.log("Response received:", signInResult);
            if (signInResult?.success && signInResult.requestId === request.requestId) {
                setPlayer({
                    avatarId: request.avatarId,
                    nickname: request.nickname
                })
                setAvatar(true);
                navigate(`${location.pathname}/players`,{replace:true});
            }else{
                toast.error("Ana are mere");
            }
        }  catch (error) {
        console.error("Request failed:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
        }
        const errorDto = error as unknown as ServerSendsErrorMessageDto;
        let message = errorDto?.error ?? "An error occurred, but no error message was provided.";
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
      if (!readyState){
          toast.error("not connected");
          return;
      }

        var request:ClientRetrieveAvatarDto={
            requestId:crypto.randomUUID(),
            eventType:StringConstants.ClientRetrieveAvatarDto,
            gameId:params.gameId!.toString()
        }
      try {
          const getImages: ServerSendsAvatarList = await sendRequest<ClientRetrieveAvatarDto, ServerSendsAvatarList>(request, StringConstants.ServerSendsAvatarList).finally(() => console.log("getImages"));
          if (getImages.requestId === request.requestId) {
              const images: Avatar[] = getImages.paths?.map((path) => ({ id: path, path })) || [];
              setImages(images);
              hasFetchedAvatars.current=true;
              toast.success("Images retrieved" + images.length);
          }
      } catch (error) {
          console.error("Request failed:", error);
          if (error instanceof Error) {
              console.error("Error message:", error.message);
          }
          const errorDto = error as unknown as ServerSendsErrorMessageDto;
          let message = errorDto?.error ?? "An error occurred, but no error message was provided.";
          console.log(message);
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