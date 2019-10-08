import {MESSAGE_SEND_REQUEST, MESSAGE_SEND_FAILURE, MESSAGES_GET_REQUEST, MESSAGES_GET_SUCCESS, MESSAGES_GET_FAILURE, MESSAGE_SEND_SUCCESS} from "./action-consts";
import { Dispatch } from "react";
import {Message} from '../models/Message'
import * as socket from '../../socket'

export function getMessagesAction() {
  return function(dispatch: Dispatch<any>) {
    dispatch({
      type: MESSAGES_GET_REQUEST
    });
    
  fetch("http://localhost:8000/messages")
    .then(response => response.json())
    .then(data => dispatch({
        type: MESSAGES_GET_SUCCESS,
        payload: data
      }))
    .catch(error => dispatch({
        type: MESSAGES_GET_FAILURE,
        payload: error
      })
    );
  }
}


export function sendMessageAction(message: Message) {
  return function(dispatch: Dispatch<any>) {
    dispatch({
      type: MESSAGE_SEND_SUCCESS,
      message
    });

    socket.socket().emit(MESSAGE_SEND_REQUEST, message);

  }
}
