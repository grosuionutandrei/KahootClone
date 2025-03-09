import {Player} from "../../../paramModels";


export const LobbyPlayer =
    (player:Player) => {
        return (
            <div className="grid grid-cols-1 gap-4">
                <div
                    key={player.id}
                    className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow m-1"
                >
                    <img
                        src={player.avatarId}
                        alt={player.nickname}
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                    />
                    <span className="text-lg font-medium">{player.nickname}</span>
                </div>
            </div>
        );
    }
