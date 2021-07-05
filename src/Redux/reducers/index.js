import { combineReducers } from 'redux'

import userReducer from './user'
import companyReducer from './company'
import SubscriptionReducer from './subscription'
import MyTeamReducer from './myTeam'

const appReducer =  combineReducers({
  user: userReducer,
  company: companyReducer,
  subscription: SubscriptionReducer,
  myTeamSearch: MyTeamReducer
})


const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
