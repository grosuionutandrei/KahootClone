
import {useAtom} from "jotai";
import {PlayerAtom, ShowAvatarAtom} from "../../atoms/generalAtoms.ts";
import {PlayersAtom} from "../../atoms";
import toast from "react-hot-toast";

export const Navigation = () => {
       const [player,_]= useAtom(PlayerAtom);
       const [showAvatar,setAvatar]= useAtom(ShowAvatarAtom);
       const [players,setPlayers]= useAtom(PlayersAtom);
    return (
        <div className="w-full h-1/20 bg-gray-800 p-4 flex flex-row justify-between items-center text-white shadow-md">
            <div>
                <h2>Current players:{players}</h2>
            </div>
            <div
                key={player.id}
                className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow"
            >
                {showAvatar ? (
                    <>
                        <img
                            src={player.avatarId}
                            alt={player.nickname}
                            className="w-12  h-full rounded-full border-2 border-gray-600"
                        />
                        <span className="text-lg font-medium">{player.nickname}</span>
                    </>
                ) : null}

            </div>
        </div>
    );
};