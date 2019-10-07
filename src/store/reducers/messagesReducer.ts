
import { Action } from "redux";
import { Message } from "../models/Message";
import { MESSAGES_GET_REQUEST, MESSAGES_GET_SUCCESS, MESSAGES_GET_FAILURE } from "../actions/action-consts";

enum FetchStatus {
  Waiting,
  Received,
  Failed,
  Initial
}

interface MessagesState {
  data: Array<Message>,
  status: FetchStatus
}

const initialState: MessagesState = { data: [], status: FetchStatus.Initial };

export default function messagesReducer(state = initialState, action: any) {
  switch (action.type) {
    case MESSAGES_GET_REQUEST: 
      state = Object.assign({}, state, {status: FetchStatus.Waiting});
      break;
    
    case MESSAGES_GET_SUCCESS: 
      state = Object.assign({}, state, {data: [...action.payload], status: FetchStatus.Received});
      break;

    case MESSAGES_GET_FAILURE:
        state = Object.assign({}, state, {status: FetchStatus.Failed, error: action.payload});
      break;
  }
  
  return state;
}