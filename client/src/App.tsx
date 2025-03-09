import {WsClientProvider} from "ws-request-hook";
import {Toaster} from "react-hot-toast";
import {Navigate, Route, Routes} from "react-router-dom";
import {KEYS} from "./hooks/keys";
import {useClientIdState} from "./hooks";
import React, {useState} from "react";
import './App.css'
import {AdminPage, Answer, GamePage, Home, JoinedPlayers, Lobby} from "./pages";
import {Navigation} from "./components/Navigation/Navigation.tsx";

const baseUrl = import.meta.env.VITE_API_BASE_URL
export default function App() {
   const manageClientId= useClientIdState(KEYS.CLIENT_ID);
   const [clientId,setClientId] = useState(manageClientId.getClientId());
    return (
        <WsClientProvider url={baseUrl + '?id=' + clientId}>
            <Navigation ></Navigation>
            <div className={"w-screen h-19/20 flex-col justify-center items-center bg-white"}>
            <Routes>
                <Route path={"admin"} element={<AdminPage/>}></Route>
                <Route path={"admin/:gameId/game"} element={<GamePage/>}></Route>
                <Route path={"/"} element={<Home/>} ></Route>
                <Route path={"lobby/:gameId/players/game/answer"} element={<Answer/>} ></Route>
                <Route path={"lobby/:gameId"} element={<Lobby/>}></Route>
                <Route path={"lobby/:gameId/players/game"} element={<GamePage/>}></Route>
                <Route path={"lobby/:gameId/players"} element = {<JoinedPlayers/>}></Route>
            </Routes>
            </div>
            <Toaster/>
        </WsClientProvider>
    )
}
