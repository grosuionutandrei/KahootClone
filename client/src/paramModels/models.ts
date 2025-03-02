 export interface Image {
    path:string
    id:string
    onSelect:(id:string,path:string)=>void
}
export interface Avatar {
    path:string,
    id:string
}
export  interface RetriveAvatar{
     getSelectedAvatar:(avatar:Avatar)=>void
 }