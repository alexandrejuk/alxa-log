import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/MaintenanceManagerMobile'

const Manager = ({
  history,
}) => {

  return (
    <ManagerContainer />
  )
}

export default withRouter(Manager)
