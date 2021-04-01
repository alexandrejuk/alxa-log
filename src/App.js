import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import storage from 'redux-persist/lib/storage'

import Login from './Pages/Login'
import Register from './Pages/Accreditation/Register'
import Success from './Pages/Accreditation/Register/Success'
import logged, { LoggedWithoutLayout } from './Pages/Logged'
import reducers from './Redux/reducers'
import Onboarding from './Pages/Onboarding'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}></PersistGate>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/register/sucess" component={Success} />
        <Route path="/register" component={Register} />
        <Route path="/logged/pdv" component={LoggedWithoutLayout} />
        <Route path="/logged" component={logged} />
        <Route exact path="/user/onboarding" component={Onboarding} />
        <Redirect from="*" to="/login" />
      </Switch>
    </Provider>
  )
}

export default App
