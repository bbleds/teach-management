import { FETCH_USER_SUCCESS } from '../constants'

export default (state = {}, action) => {
  switch(action.type){
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data
      }
    default:
      return state
  }
}
