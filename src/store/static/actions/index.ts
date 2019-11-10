import {Dispatch} from "redux";
import {makeRequest} from "../../../util";
import {USER_CURRENT_AUTHENTICATED} from "../../user/actions";

export const LANGUAGES_GET = 'LANGUAGES_GET';
export const TOPICS_GET = 'TOPICS_GET';
export const LEARNING_GOALS_GET = 'LEARNING_GOALS_GET';


export function languagesGetAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/static/languages', {})
            .then(response => {
                return dispatch({
                    type: LANGUAGES_GET,
                    languages: response.languages
                });
            })
            .catch(error => console.log("ERROR FETCHING LANGUAGES"));
    };
}


export function topicsGetAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/static/topics', {})
            .then(response => {
                return dispatch({
                    type: TOPICS_GET,
                    topics: response.topics
                });
            })
            .catch(error => console.log("ERROR FETCHING TOPICS"));
    };
}


export function learningGoalsGetAction() {
    return function(dispatch: Dispatch<any>) {
        makeRequest('/static/learning_goals', {})
            .then(response => {
                console.log(response);
                return dispatch({
                    type: LEARNING_GOALS_GET,
                    learning_goals: response.learning_goals
                });
            })
            .catch(error => console.log("ERROR FETCHING LEARNING GOALS"));
    };
}
