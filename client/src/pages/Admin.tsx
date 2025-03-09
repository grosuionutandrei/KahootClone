import {
    ClientStartsCounter,
    CounterBroadcast,
    ServerSendsErrorMessageDto,
    StringConstants
} from "../generated-client.ts";
import {useWsClient} from "ws-request-hook";
import toast from "react-hot-toast";

export const AdminPage = () => {
    const {onMessage, sendRequest, readyState} = useWsClient();


    const startGame = async () => {
        const request: ClientStartsCounter = {
            requestId: crypto.randomUUID(),
            eventType: StringConstants.ClientStartsCounter
        }
        try {
            const response = await sendRequest<ClientStartsCounter, CounterBroadcast>(request, StringConstants.CounterBroadcast)
            if (response.startCounter) {
                toast.success("GameStarted")
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