import {Dispatch} from "react";

export const simpleAction = () => (dispatch: Dispatch<any>) => {
    dispatch({
        type: 'SIMPLE_ACTION',
        payload: {
            text: 'A'
        },
    })
};
