import {LANGUAGES_GET} from "../actions";

const INITIAL_STATE = {
    languages: ['Hungarian', 'English', 'German', 'Portuguese'] as Array<string>
};

function languageReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case LANGUAGES_GET:
            //reduced = reduced;
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default languageReducer;
