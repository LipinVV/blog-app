import {ACTION} from "../actions";
import {ActionType, StateType} from "../types";


export const reducer = (currentState: StateType, payLoad: ActionType) => {
    switch (payLoad.action) {
        case ACTION.LOAD_USERS:
            return {
                ...currentState, users: payLoad.data
            }
        case ACTION.LOAD_USER_POST:
            return {
                ...currentState, posts: payLoad.data
            }
        case ACTION.LOAD_POST_COMMENTS:
            return {
                ...currentState, comments: payLoad.data
            }
        case ACTION.UPDATE_POST_COMMENTS:
            return {
                ...currentState, comments: payLoad.data
            }
        default: {
            return currentState
        }
    }
}