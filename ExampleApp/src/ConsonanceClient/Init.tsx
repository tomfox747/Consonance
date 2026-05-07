import React, { type  JSX } from "react";
import { Consonance_Ctx } from "./Context";
import { useConsonance } from "./useConsonance";

export const Consonance = React.memo((props:{children:JSX.Element}) => {

    const c = useConsonance()

    console.log('Consonance re-rendered')

    return <Consonance_Ctx.Provider value={{sendMessage: c}}>
        {props.children}
    </Consonance_Ctx.Provider>
})