import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import MaintenanceDetailMobile from '../../Containers/MaintenanceDetailMobile'

const Manager = ({
  history,
}) => {

  const handleSubmit = values => {
    console.log(values)
  }

  const goBack = () => history.push('/logged/mobile-maintenance')

  return (
    <MaintenanceDetailMobile 
      goBack={goBack}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(Manager)
