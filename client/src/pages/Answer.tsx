import {Variant} from "../components/Variants/Variant.tsx";
import {useEffect, useRef, useState} from "react";
import {CurrentQuestion} from "../paramModels/models.ts";
import {ServerSendsCurrentQuestionId, StringConstants} from "../generated-client.ts";
import toast from "react-hot-toast";
import {useWsClient} from "ws-request-hook";

export const Answer = ()=>{
    const {onMessage, sendRequest, send, readyState} = useWsClient();
    const [disabled,setDisabled] = useState<boolean>(false);
    const [currentQuestion,setCurrentQuestion]= useState<CurrentQuestion>({
        gameId:"",
        questionId:"",
        options : []
    });
    const selectedResponse = useRef<string>("");

    useEffect(() => {
        if(!readyState)return
        console.log("✅ WebSocket is ready! Subscribing to messages...");

        const unsubscribe = onMessage<ServerSendsCurrentQuestionId>(
            StringConstants.ServerSendsCurrentQuestionId,
            (message) => {
                setCurrentQuestion({
                    gameId: message.gameId || "",
                    questionId: message.questionId || "",
                    options: message.questionOptions || []
                });
                toast.success(`New Question ID: ${message.questionId}`);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [onMessage, readyState]);



    const retrieveReponse = (value:string)=>{
        selectedResponse.current =  value;
        setDisabled(true);
    }

return (
    <Variant disabled={disabled} options={currentQuestion.options} retrieveValue={retrieveReponse}>

    </Variant>
)
}