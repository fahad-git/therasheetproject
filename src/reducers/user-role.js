import { USER_ACCOUNT_TYPE, ACCOUNT_PROFILE_URL } from "../constants/user";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };


export default function (state = initialState, action){

    const { type } = action;

    switch(type){
        case USER_ACCOUNT_TYPE:
            return { ...state, account_type: action.account_type,  account_username: action.account_username, account_profile_url: action.account_profile_url };

        case ACCOUNT_PROFILE_URL:
            return { ...state, account_profile_url: action.account_profile_url };
            
        default:
          return state;
    }

}