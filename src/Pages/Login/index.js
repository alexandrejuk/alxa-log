import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import LoginContainer from '../../Containers/Login'
import Auth from '../../Services/Auth'
import { getCompanyById } from '../../Services/Company'
import { getSubscriptionActivated } from '../../Services/Subscription'

const Login = ({
  history,
  loggedUser,
  setCompany,
  setStatus,
  setSubscription
}) => {
  const [isVisibleMessageError, setIsVisibleMessageError] = useState(false)
  const [loading, setLoading] = useState(false)

  const authentication = (values) => {
    let redirectPage = '/logged/dashboard'
    setLoading(true)
    Auth(values)
      .then(({ data }) => {
        loggedUser(data)
        if (data.firstAccess) {
          redirectPage = '/user/onboarding'
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('user.name', data.name)
        return data
      })
      .then((data) => {
        return getCompanyById(data.companyId)
      })
      .then(({ data }) => setCompany(data))
      .then(({ data }) => setStatus(data))
      .then(() => getSubscriptionActivated())
      .then(({ data }) => setSubscription(data))
      .then(() => history.push(redirectPage))
      .catch((err) => {
        setLoading(false)
        setIsVisibleMessageError(!!err.response)
        console.error(err)
      })
  }

  return (
    <LoginContainer
      authentication={authentication}
      isVisibleMessageError={isVisibleMessageError}
      loading={loading}
      registerPath="register"
    />
  )
}

const mapDispatchToProps = (dispatch) => ({
  loggedUser: (payload) => dispatch({ type: 'USER_LOGGED', payload }),
  setCompany: (payload) => dispatch({ type: 'SET_COMPANY', payload }),
  setStatus: (payload) => dispatch({ type: 'SET_STATUS', payload }),
  setSubscription: (payload) => dispatch({ type: 'SET_SUBSCRIPTION', payload })
})

const enhanced = compose(connect(null, mapDispatchToProps), withRouter)

export default enhanced(Login)
