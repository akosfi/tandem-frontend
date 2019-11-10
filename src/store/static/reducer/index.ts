import {LANGUAGES_GET, LEARNING_GOALS_GET, TOPICS_GET} from "../actions";
import {Language} from "../models/Language";
import {Topic} from "../models/Topic";
import {LearningGoal} from "../models/LearningGoal";

const INITIAL_STATE = {
    languages: [] as Array<Language>,
    topics: [] as Array<Topic>,
    learning_goals: [] as Array<LearningGoal>,
};

function staticReducer(state=INITIAL_STATE, action: any) {
    let reduced;
    switch (action.type){
        case LANGUAGES_GET:
            reduced = {...state, languages: action.languages};
            break;

        case TOPICS_GET:
            reduced = {...state, topics: action.topics};
            break;

        case LEARNING_GOALS_GET:
            reduced = {...state, learning_goals: action.learning_goals};
            break;
        default:
            reduced = state;
            break;
    }
    return reduced;
}

export default staticReducer;
