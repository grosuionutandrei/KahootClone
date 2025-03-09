import {CountdownTimer} from "../components/Lobby";
import {
    AdminAskCurrentQuestionDto, AdminDisplayQuestion,
    ServerSendsCurrentQuestionForAdmin,
    ServerSendsErrorMessageDto,
    StringConstants
} from "../generated-client.ts";
import toast from "react-hot-toast";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useWsClient} from "ws-request-hook";
import {useAtom} from "jotai";
import {CurrentQuestionAtom} from "../atoms/CurrentQuestion/CurrentquestionAtom.ts";

export const GamePage =()=>{
    const { onMessage, sendRequest,send, readyState } = useWsClient();
    const [currentQuestion,setCurrentQuestion] = useAtom(CurrentQuestionAtom);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const onComplete = async ()=>{
        const request:AdminAskCurrentQuestionDto ={
            gameId:params.gameId!,
            eventType:StringConstants.AdminAskCurrentQuestionDto,
            requestId:"ana"
        }
        try {
            const questionReceived  = await sendRequest<AdminAskCurrentQuestionDto,ServerSendsCurrentQuestionForAdmin>(
                request,StringConstants.ServerSendsCurrentQuestionForAdmin
            );
            if(questionReceived.success){
                if(location.pathname.includes("admin")){
                    setCurrentQuestion({
                        questionId:questionReceived.questionId,
                        questionText:questionReceived.questionText,
                        questionOptions:questionReceived.questionOptions,
                        isNextQuestion:questionReceived.isNextQuestion,
                        requestId:questionReceived.requestId
                    })
                    toast.success("I got the question");
                    navigate(`${location.pathname}/currentQuestion`,{replace:true});
                    sendCommandToDisplayAnswers(questionReceived.questionId!,params.gameId!);
                    return;
                }
                if(location.pathname.includes("players")){
                    navigate(`${location.pathname}/answer`,{replace:true});
                }

            }
        }catch (error){
            console.error("Request failed:", error);
            if (error instanceof Error) {
                console.error("Error message:", error.message);
            }
            const errorDto = error as unknown as ServerSendsErrorMessageDto;
            let message = errorDto?.error ?? "An error occurred, but no error message was provided.";
            console.error(error + " erro response");
            toast.error(message);
        }
    }

    const sendCommandToDisplayAnswers=(questionId:string,gameId:string)=>{
        const request:AdminDisplayQuestion = {
            questionId:questionId,
            gameId:gameId,
            eventType:StringConstants.AdminDisplayQuestion,
            requestId:crypto.randomUUID()
        }
        send<AdminDisplayQuestion>(request);
    }




    return (
        <div className={"w-screen h-full flex flex-col justify-center items-center bg-orange-300"}>
            <CountdownTimer onComplete={onComplete} limit={5}></CountdownTimer>
</div>
    )

}