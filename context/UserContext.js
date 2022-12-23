import { createContext, useEffect, useReducer } from "react";


export const INITIAL_STATE = {
    token: '',
    user: {}
}

export const UserReducer = (state, action) => {
    switch (action.type) {

        case "UPDATE_TOKEN":
            return {
                ...state,
                token: action.payload
            }

        case "UPDATE_DATA":
            return {
                ...state,
                user: action.payload,
            }

        case "LOG_OUT":
            return {
                token: "",
                user: {}
            }
        default:
            break;
    }
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    const fetchUserData = async (token) => {
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token }),
        })
        let userData = await res.json()
        dispatch({ type: "UPDATE_DATA", payload: userData });
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch({ type: "UPDATE_TOKEN", payload: localStorage.getItem("token") });
            fetchUserData(localStorage.getItem("token"));
        }
    }, [])

    return (
        <UserContext.Provider value={{ userState: state.user, token: state.token, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}



