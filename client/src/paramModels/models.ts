import {QuestionOptionDto} from "../generated-client.ts";

export interface Image {
    path:string
    id:string
    onSelect:(id:string,path:string)=>void
     selected:string
     setSelected:(id:string)=>void
}
export interface Avatar {
    path:string,
    id:string
}
export  interface RetriveAvatar{
    getSelectedAvatar:(avatar:Avatar)=>void
    images:Avatar[]
 }

 export interface Player{
     id?: string;
     nickname?: string;
     avatarId?: string;
 }
 export interface Created {
    created:boolean
 }

 export interface VariantParam{
    color:string,
     value:string,
     shape:string
 }
 export interface CurrentQuestion{
    questionId:string,
     gameId:string,
     options:QuestionOptionDto[]
 }

 export interface CounterParams{
    limit:number,
     onComplete:()=>void
 }

 export interface AnswerParams{
    retrieveValue:(value:string)=>void,
     options:QuestionOptionDto[],
     disabled:boolean
 }