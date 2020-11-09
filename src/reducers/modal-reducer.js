import {ADMIN_PASSWORD_MODAL_OPEN, ADMIN_PASSWORD_MODAL_CLOSE} from "../constants/modal";
import {ADMIN_PROFILE_INFO_MODAL_OPEN, ADMIN_PROFILE_INFO_MODAL_CLOSE} from "../constants/modal";


import { DIRECTOR_PASSWORD_MODAL_OPEN, DIRECTOR_PASSWORD_MODAL_CLOSE } from "../constants/modal";
import { DIRECTOR_PROFILE_INFO_MODAL_OPEN, DIRECTOR_PROFILE_INFO_MODAL_CLOSE } from "../constants/modal";


import { CLINICIAN_PASSWORD_MODAL_OPEN, CLINICIAN_PASSWORD_MODAL_CLOSE } from "../constants/modal";
import { CLINICIAN_PROFILE_INFO_MODAL_OPEN, CLINICIAN_PROFILE_INFO_MODAL_CLOSE } from "../constants/modal";

const initialState = {
    isPasswordChange: false,
    isAccountInfoOpen: false,
    isDirectorAccountInfoOpen: false,
    isDirectorPasswordChange: false,
    isClinicianAccountInfoOpen: false,
    isClinicianPasswordChange: false,
  };

//  this reducer function is for CLinic info
export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {

    // Cases for Admin
    case ADMIN_PASSWORD_MODAL_OPEN:
      return { ...state, isPasswordChange: action.isPasswordChange };

    case ADMIN_PASSWORD_MODAL_CLOSE:
      return { ...state, isPasswordChange: action.isPasswordChange };
      
    case ADMIN_PROFILE_INFO_MODAL_OPEN:
      return { ...state, isAccountInfoOpen: action.isAccountInfoOpen};
      
    case ADMIN_PROFILE_INFO_MODAL_CLOSE:
      return { ...state, isAccountInfoOpen: action.isAccountInfoOpen};

    // Cases for Director
    case DIRECTOR_PASSWORD_MODAL_OPEN:
      return { ...state, isDirectorPasswordChange: action.isDirectorPasswordChange};

    case DIRECTOR_PASSWORD_MODAL_CLOSE:
      return { ...state, isDirectorPasswordChange: action.isDirectorPasswordChange};

    case DIRECTOR_PROFILE_INFO_MODAL_OPEN:
      return { ...state, isDirectorAccountInfoOpen: action.isDirectorAccountInfoOpen};
  
    case DIRECTOR_PROFILE_INFO_MODAL_CLOSE:
      return { ...state, isDirectorAccountInfoOpen: action.isDirectorAccountInfoOpen};
      
    // Cases for Clinician

    case CLINICIAN_PASSWORD_MODAL_OPEN:
      return { ...state, isClinicianPasswordChange: action.isClinicianPasswordChange};

    case CLINICIAN_PASSWORD_MODAL_CLOSE:
      return { ...state, isClinicianPasswordChange: action.isClinicianPasswordChange};

    case CLINICIAN_PROFILE_INFO_MODAL_OPEN:
      return { ...state, isClinicianAccountInfoOpen: action.isClinicianAccountInfoOpen};
  
    case CLINICIAN_PROFILE_INFO_MODAL_CLOSE:
      return { ...state, isClinicianAccountInfoOpen: action.isClinicianAccountInfoOpen};
      

    default:
      return state;
  }
}