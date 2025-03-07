import {Player} from "../../../paramModels";


export const LobbyPlayer =
    (player:Player) => {
        return (
            <div className="h-1/2 overflow-y-auto p-4 bg-gray-900 text-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold mb-4">{player.nickname}</h2>
                <div className="grid grid-cols-2 gap-4">
                        <div
                            key={player.id}
                            className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg shadow"
                        >
                            <img
                                src={player.avatarId}
                                alt={player.nickname}
                                className="w-12 h-12 rounded-full border-2 border-gray-600"
                            />
                            <span className="text-lg font-medium">{player.nickname}</span>
                        </div>
                </div>
            </div>
        );
    }
