import {MESSAGE_SEND_REQUEST, MESSAGE_SEND_FAILURE} from "./action-consts";
import { Dispatch } from "react";
import {MessageHeader} from '../models/MessageHeader'


export function sendMessageAction(message: MessageHeader) {
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