'use client'

import axios from "axios";
import {useEffect, useState} from "react";
import {UserDetailContext} from "@/context/UserDetailContext";
import {SettingContext, settingContext} from "@/context/SettingContext";

function Provider({children}) {

    const [userState, setUserState] = useState()
    const [settingDetails, setSettingDetails] = useState()

    const createNewUser = async () => {
        const result = await axios.post('/api/user', {})

        setUserState(result.data)
    }

    useEffect(() => {
        createNewUser()
    }, [])



    return (
        <UserDetailContext value={{userState, setUserState}}>
            <SettingContext.Provider value={{settingDetails, setSettingDetails}}>
                <div>{children}</div>
            </SettingContext.Provider>
        </UserDetailContext>
    );
}

export default Provider;