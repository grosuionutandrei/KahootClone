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