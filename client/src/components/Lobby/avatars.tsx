import { useAtom } from 'jotai'
import {AvatarImagesAtom} from "../../atoms";
import { RetriveAvatar} from "../../paramModels"
import {Thumbnail} from "./thumbnail.tsx";


export const Avatars=({getSelectedAvatar}:RetriveAvatar)=>{
    const [images,_]= useAtom(AvatarImagesAtom);
    const onSelectImage=(id:string,path:string)=>{
        getSelectedAvatar({path:path,id:id});
    }

    return(
          images.map((i:string,index:number)=>(
              <Thumbnail onSelect={onSelectImage} id={i} key={i} path={i}></Thumbnail>
            ))
    )


}