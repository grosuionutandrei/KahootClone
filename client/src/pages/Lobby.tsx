import {Avatars} from "../components/Lobby";
import {useEffect, useState} from "react";
import {
    ClientAddsPlayerInfoDto,
    ServerConfirmsDto,
    ServerSendsErrorMessageDto,
    StringConstants
} from "../generated-client.ts";
import {Avatar} from "../paramModels";
import {useWebSocketWithRequests, useWsClient} from "ws-request-hook";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";


export const Lobby = () => {
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [sentRequestId, setSentRequestId] = useState<string>("");
    const params =  useParams();
    const [user, setUser] = useState<ClientAddsPlayerInfoDto>({
        Id: crypto.randomUUID(),
        Nickname: "",
        AvatarId: "",
        GameId:params.gameId!.toString()
    })
    useEffect(() => {
        if (!readyState) return;

    }, [onMessage]);


    const retrieveAvatar = (avatar: Avatar) => {
        setUser((prevState) => ({...prevState, AvatarId: avatar.id}))
    }

    const getNickName = (nickName: string) => {
        setUser((prevState) => ({...prevState, Nickname: nickName}))
    }

    const clientSetsUserAvatar = async () => {

        if (user.Nickname === "") {
            toast.error("insert a nick name");
            return;
        }
        console.log(user.GameId);
        const request: ClientAddsPlayerInfoDto = {
            Id: user.Id,
            Nickname: user.Nickname,
            AvatarId: user.AvatarId,
            GameId:user.GameId,
            requestId: crypto.randomUUID().toString(),
            eventType: StringConstants.ClientAddsPlayerInfoDto
        }
        try {
            setSentRequestId(request.requestId!);
            const signInResult: ServerConfirmsDto = await sendRequest<ClientAddsPlayerInfoDto, ServerConfirmsDto>(request, StringConstants.ServerConfirmsDto).finally(() => console.log("er"));
            console.log(signInResult);
            if (signInResult?.success&&signInResult.requestId==sentRequestId) {
                toast.success("Settings saved");
            }
        } catch (error) {
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            let message = "";
            if (errorDto.error == null) {
                message = "An error Occured";
            } else {
                message = errorDto.error
            }
            toast.error(message);
        }
    }


    return (
        <div className={"w-screen h-screen flex flex-col justify-center items-center bg-blue-400"}>
            <h2 className={"m-1 text-white text-3xl"}>Please chose an avatar</h2>
            <div className={"w-1/3 h-1/4 flex flex-wrap justify-between items-center overflow-y-scroll bg-blue-150"}>
                <Avatars getSelectedAvatar={retrieveAvatar}></Avatars>
            </div>
            <input onChange={(e) => getNickName(e.target.value)} type="text" value={user.Nickname}
                   placeholder="type your nickname" className="mt-20 input input-neutral"/>
            <button className=" m-1 btn btn-active bg-orange-600 text-white" onClick={clientSetsUserAvatar}>Submit
            </button>
        </div>
    )

}