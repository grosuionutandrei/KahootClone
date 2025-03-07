import {atom} from "jotai";
import {Player} from "../paramModels";

export const ShowAvatarAtom = atom<boolean>(false);

export const PlayerAtom = atom<Player>({});

export const SetPlayerAtom = atom(
    (get) => get(PlayerAtom),
    (get, set, newPlayer: Player) => {
        set(PlayerAtom, newPlayer);
        set(ShowAvatarAtom, !!newPlayer.id);
    }
);


export const PlayersAtom = atom<number>(0)