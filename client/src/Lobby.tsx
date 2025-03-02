import {Avatars} from "./components/Lobby";

export const Lobby=()=>{
    return (
        <div className={"w-screen h-screen flex-col justify-center items-center"} >
             <div className={"flex-row justify-between items-center flex-wrap"}>

             </div>

        </div>
    )

}






// import {useWsClient} from "ws-request-hook";
// import {useEffect, useState} from "react";
// import {
//     ClientEntersLobbyDto,
//     ServerConfirmsDto, ServerPutsClientInLobbyAndBroadcastsToEveryoneDto,
//     ServerSendsErrorMessageDto,
//     StringConstants
// } from "./generated-client.ts";
//
// export default function Lobby() {
//     const {onMessage, sendRequest, send, readyState} = useWsClient();
//     const [test,setTest] = useState<boolean>(false);
//     const [message,setReceivedMessage] = useState<string>("test");
//
//
//     useEffect(() => {
//         if (readyState !== 1) return;
//         reactToBroadcasts();
//     }, [onMessage,readyState]);
//
//  const subscribeToLoby =async ()=>{
//      var request:ClientEntersLobbyDto = {
//          eventType:StringConstants.ClientEntersLobbyDto,
//          requestId: crypto.randomUUID().toString()}
//      console.log(request);
//      try{
//          const signInResult: ServerConfirmsDto = await sendRequest<ClientEntersLobbyDto
//
//              , ServerConfirmsDto>(request,StringConstants.ServerConfirmsDto).finally(()=>console.log("er"));
//          console.log(signInResult);
//          if (signInResult?.success) {
//              setTest(true)
//          } else {
//              setTest(false);
//          }
//      }catch (error){
//          const errorDto = error as unknown as ServerSendsErrorMessageDto;
//          console.log(errorDto);
//      }
//  }
//     const reactToBroadcasts = async() => {
//         const unsubscribe =  onMessage<ServerPutsClientInLobbyAndBroadcastsToEveryoneDto>(
//             StringConstants.ServerPutsClientInLobbyAndBroadcastsToEveryoneDto,
//             (message) => {
//                 console.log(message)
//                 setReceivedMessage(message.eventType || "No message received");
//             }
//         );
//         return () => unsubscribe();
//     }
//
//
//
//
//
//     return (
//         <>
//             <button onClick={subscribeToLoby} className="btn btn-outline btn-primary">Primary</button>
//             {test?(<p>"ana are mere</p>):<p>not sent</p>}
//             <p>{message}</p>
//             </>)
// }
