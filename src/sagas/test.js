import { takeEvery } from "redux-saga/effects" ;
import { TEST } from "../constants/types";


// worker
export function* handler(){

}


// watcher
export default function* testSaga(){
    takeEvery(TEST, handler)

}