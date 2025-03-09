import {
    ClientStartsCounter,
    CounterBroadcast,
    ServerSendsErrorMessageDto,
    StringConstants
} from "../generated-client.ts";
import {useWsClient} from "ws-request-hook";
import toast from "react-hot-toast";
import {useLocation, useNavigate} from "react-router-dom";

export const AdminPage = () => {
    const {onMessage, sendRequest, readyState} = useWsClient();
    const navigate = useNavigate();
    const location = useLocation();


    const startGame = async () => {
        const request: ClientStartsCounter = {
            requestId: crypto.randomUUID(),
            eventType: StringConstants.ClientStartsCounter
        }
        try {
            const response = await sendRequest<ClientStartsCounter, CounterBroadcast>(request, StringConstants.CounterBroadcast)
            if (response.startCounter) {
                toast.success("GameStarted")
                navigate(`${location.pathname}/4f8e9409-e175-426d-91d4-eb942d38ebd0/game `,{replace:true})
            }
        } catch (error) {
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            toast.error(errorDto.error!.toString);
        }
    }


    return (
        <button onClick={startGame}>
            start
        </button>
    )
}