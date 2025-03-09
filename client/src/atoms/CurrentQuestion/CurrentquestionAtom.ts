import {atom} from "jotai";
import {ServerSendsCurrentQuestionForAdmin} from "../../generated-client.ts";

export const  CurrentQuestionAtom = atom<ServerSendsCurrentQuestionForAdmin>({
   questionId:"",
   questionOptions:[],
   questionText:"",
   isNextQuestion:false,
    requestId:""
});