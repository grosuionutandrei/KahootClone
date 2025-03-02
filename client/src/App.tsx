import {WsClientProvider} from "ws-request-hook";
import {Toaster} from "react-hot-toast";
import {Route, Routes} from "react-router-dom";
import {KEYS} from "./hooks/keys";
import {useClientIdState} from "./hooks";
import React, {useState} from "react";

import './App.css'
import {Home, Lobby} from "./pages";

const baseUrl = import.meta.env.VITE_API_BASE_URL


export default function App() {
   const manageClientId= useClientIdState(KEYS.CLIENT_ID);
   const [clientId,setClientId] = useState(manageClientId.getClientId());

    return (
        <WsClientProvider url={baseUrl + '?id=' + clientId}>
            <div className={"w-screen h-screen flex-col justify-center items-center bg-white"}>

            <Routes>

                <Route path={"/"} element={<Home/>} ></Route>
                <Route path={"lobby/:gameId"} element={<Lobby/>}>
                </Route>
            </Routes>
            </div>
            <Toaster/>
        </WsClientProvider>

    )

}
