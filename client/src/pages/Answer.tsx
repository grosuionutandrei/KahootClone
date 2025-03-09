import {Variant} from "../components/Variants/Variant.tsx";
import {useEffect, useRef, useState} from "react";
import {CurrentQuestion} from "../paramModels/models.ts";
import {ServerSendsCurrentQuestionId, StringConstants} from "../generated-client.ts";
import toast from "react-hot-toast";
import {useWsClient} from "ws-request-hook";

export const Answer = ()=>{
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [disabled,setDisabled] = useState<boolean>(false);
    const currentQuestion= useRef<CurrentQuestion>({
        gameId:"",
        questionId:"",
        options : []
    });
    const response = useRef<string>("");
    useEffect(() => {
        if(!readyState)return
        reactToMessage();
    }, [onMessage]);

    const reactToMessage = async ()=>{
        const unsubscribe=onMessage<ServerSendsCurrentQuestionId>(
            StringConstants.ServerSendsCurrentQuestionId,
            message => {
                currentQuestion.current = {
                    gameId: message.gameId || "",
                    questionId: message.questionId || "",
                    options: message.questionOptions || []
                }
                toast.success("retrieved Question")
            }
        )
        return ()=>unsubscribe();
    }

return (
    <Variant>

    </Variant>
)
}