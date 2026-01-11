'use client'

import axios from "axios";
import {useEffect, useState} from "react";
import {UserDetailContext} from "@/context/UserDetailContext";

function Provider({children}) {

    const [userState, setUserState] = useState()

    const createNewUser = async () => {
        const result = await axios.post('/api/user', {})

        setUserState(result.data)
    }

    useEffect(() => {
        createNewUser()
    }, [])



    return (
        <UserDetailContext value={{userState, setUserState}}>
            <div>{children}</div>
        </UserDetailContext>
    );
}

export default Provider;