import { createLogic } from 'redux-logic'
import axios from 'axios'
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
 } from '../constants'

const fetchUserLogic = createLogic({
  type: FETCH_USER,
  process({ getState, action }, dispatch, done){
    
    axios.get('/api/current_user')
    .then( user => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: user
      })
      done()
    })
  }
})

export default [
  fetchUserLogic
]
