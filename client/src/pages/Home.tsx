import {useEffect, useState} from "react";
import {useWsClient} from "ws-request-hook";
import {useNavigate} from "react-router-dom";
import {
    ClientEntersLobbyDto,
    ServerConfirmsDto,
    ServerSendsErrorMessageDto,
    StringConstants
} from "../generated-client.ts";
import toast from "react-hot-toast";

export const Home =()=>{
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [lobby,setLobby] =  useState<string>("");
    const [response,setResponse]= useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (readyState !== 1) return;
    }, []);

const reactToChange=(val:string)=>{
    setLobby(val);
}

const enterToLobby =async ()=>{
    var request:ClientEntersLobbyDto = {
        eventType:StringConstants.ClientEntersLobbyDto,
        requestId: crypto.randomUUID().toString()}
    console.log(request);
    try{
        const signInResult: ServerConfirmsDto = await sendRequest<ClientEntersLobbyDto
            , ServerConfirmsDto>(request,StringConstants.ServerConfirmsDto).finally(()=>console.log("er"));
        console.log(signInResult);
        if (signInResult?.success) {
            setResponse(true);
            toast.success("Entered to lobby")
            navigateToLobby();
        } else {
            setResponse(false);
            toast.error("Retry")
        }
    }catch (error){
        const errorDto = error as unknown as ServerSendsErrorMessageDto;
        setResponse(false);
        toast.error(errorDto.error!.toString);
    }
}


const navigateToLobby=()=>{
    navigate(`/lobby/${lobby}`,{replace:true});
}
return (
    <>
        <div className="relative w-screen h-screen">
            <img
                className="absolute w-full h-full object-cover"
                src="src/assets/back.webp"
                alt="kahootBackground"
            />
            <div className="absolute inset-x-2/4 inset-y-3/4 flex flex-col justify-center items-center">
                <input
                    type="text"
                    placeholder="Type lobby area id"
                    onChange={(e)=>reactToChange(e.target.value)}
                    value={lobby}
                    className="p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black bg-opacity-80"
                />
                <button className="btn btn-soft bg-green-600  text-black" onClick={enterToLobby} onSubmit={enterToLobby}>Join</button>
            </div>
        </div>
    </>
)
}