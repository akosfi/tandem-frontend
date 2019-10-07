import {MESSAGE_SEND_REQUEST, MESSAGE_SEND_FAILURE, MESSAGES_GET_REQUEST, MESSAGES_GET_SUCCESS, MESSAGES_GET_FAILURE} from "./action-consts";
import { Dispatch } from "react";
import {Message} from '../models/Message'

export function getMessagesAction() {
  return function(dispatch: Dispatch<any>) {
    dispatch({
      type: MESSAGES_GET_REQUEST
    });
    
  fetch("api/get/message")
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
        type: MESSAGE_SEND_REQUEST,
        message
      });
      
    /*fetch("api/post/message")
      .then(response => response.json())
      .then(data => dispatch({
          type: MESSAGE_SEND_SUCCESS,
          payload: data
        }))
      .catch(error => dispatch({
          type: MESSAGE_SEND_FAILURE,
          payload: error
        })
      );
    }*/
  }
}