import { createContext } from "react";

export const Consonance_Ctx = createContext<{sendMessage:(message:object)=>void}>({sendMessage:()=>{console.log('Consonance not connected')}})