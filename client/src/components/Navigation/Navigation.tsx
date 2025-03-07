
import {useAtom} from "jotai";
import {PlayerAtom, ShowAvatarAtom} from "../../atoms/generalAtoms.ts";
import {PlayersAtom} from "../../atoms";

export const Navigation = () => {
       const [player,_]= useAtom(PlayerAtom);
       const [showAvatar,setAvatar]= useAtom(ShowAvatarAtom);
       const [players,setPlayers]= useAtom(PlayersAtom);
    return (
        <div className="w-full h-28 bg-blue-300 p-4 flex flex-row justify-between items-center text-white shadow-md">
            <div>
                <h2>Current players:{players}</h2>
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-lg text-black font-medium self-end">{player.nickname}</span>
                <div className="avatar">
                    <div className={`${showAvatar ?"ring-primary ring-offset-base-100 w-28 rounded-full ring ring-offset-2 overflow-hidden":""}`}>
                        <img
                            src={player.avatarId}
                            alt={player.nickname}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};