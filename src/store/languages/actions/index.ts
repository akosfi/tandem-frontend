import {Dispatch} from "redux";
import {makeRequest} from "../../../util";
import {USER_CURRENT_AUTHENTICATED} from "../../user/actions";

export const LANGUAGES_GET = 'LANGUAGES_GET';


export function languagesFetchAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/languages/', {})
            .then(languages => {
                return dispatch({
                    type: LANGUAGES_GET,
                    languages
                });
            })
            .catch(error => console.log("ERROR FETCHING LANGUAGES"));
    };
}
