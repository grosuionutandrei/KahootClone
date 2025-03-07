
import {useState} from "react";
import {Image} from "../../paramModels";

export const Thumbnail =({path,id,onSelect,selected,setSelected}:Image)=>{const [identity,setId] = useState<string>(id);
   const setSelectedAvatar=()=>{
       onSelect(identity,path);
       setSelected(identity);
   }

    return (
        <button
            onClick={setSelectedAvatar}
            className={`btn btn-outline m-1 flex flex-col p-1 justify-center items-center w-28 h-28 bg-blue-150 border border-green-600 transition-all duration-300 ease-in-out ${selected===identity?"bg-green-500 text-white border-green-800 shadow-lg scale-110":""} `}
        >
            <img src={path} alt="funny image of an animal" className="w-full h-full object-contain"/>
        </button>

    )

}