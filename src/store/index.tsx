import React, {useReducer, Dispatch} from 'react';
import {reducer} from "../reducer";
import {ActionType, StateType} from "../types";


export const INITIAL_STATE: StateType = {
    users: [],
    posts: [],
    comments: [],
};

export const StoreContext = React.createContext<{ state: StateType, dispatch: Dispatch<ActionType> }>({
    state: INITIAL_STATE,
    dispatch: () => null,
});

interface StorageProps {
    children: React.ReactNode,
}

export const Store = ({children}: StorageProps) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}