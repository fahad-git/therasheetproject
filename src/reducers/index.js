import { combineReducers }  from "redux";
import auth from "./auth";
import message from "./message";
import modalReducer from "./modal-reducer";
import userReducer from "./user-role";

export default combineReducers({

    auth,
    message,
    modalReducer,
    userReducer
});