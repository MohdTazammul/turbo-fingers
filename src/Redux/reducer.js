import {STORE_TOKEN, LOGOUT} from "./actionTypes"

const init = {
    token: "",
    isLogin:false,
    data:{}
}

const reducer = (state=init, action)=>{
    switch(action.type)
    {
        case STORE_TOKEN: 
             return {...state, token:action.payload.token, isLogin:true, data:action.payload.data}
        
        case LOGOUT: 
             return {...state, token:"", isLogin:false, data:{}}

        default:
             return state;
    }
}

export {reducer}