import {Avatar, RetriveAvatar} from "../../paramModels"
import {Thumbnail} from "./thumbnail.tsx";
import {useEffect, useState} from "react";


export const Avatars = ({getSelectedAvatar, images}: RetriveAvatar) => {
    const [avatars, setAvatars] = useState<Avatar[]>(images);
    useEffect(() => {
        setAvatars((prevAvatars) => {
            return images;
        });
    }, [images])

    const [selected, setSelected] = useState<string>("");
    const onSelectImage = (id: string, path: string) => {
        getSelectedAvatar({path: path, id: id});
    }
    const toggleSelection = (id: string) => {
        setSelected(id);
    };

    return (
        avatars.map((i: Avatar) => (
            <Thumbnail onSelect={onSelectImage} id={i.id} key={i.id} path={i.path} selected={selected}
                       setSelected={toggleSelection}></Thumbnail>
        ))
    )


}