import React, { useEffect, useState } from 'react'
import { getById } from '../../../Services/MaintenanceOrders'
import { withRouter } from 'react-router-dom'

import MaintenanceDetail from '../../../Containers/Maintenance/Detail'

const Detail = ({
  match
}) => {
  const [maintenanceOrder, setMaintenanceOrder] = useState({
    company: {},
    companyId: null,
    costCenter: null,
    createdAt: null,
    driverMain: null,
    driverPhoneMain: null,
    driverPhoneSecondary: null,
    driverSecondary: null,
    id: null,
    maintenanceDate: null,
    maintenanceOrderEvents: [],
    operationId: null,
    plateCart: null,
    plateHorse: null,
    priority: null,
    service: null,
    serviceDescription: null,
    status: null,
    updatedAt: null,
    userId: null,
    supplies: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  useEffect(() => {
    getOrder()
  }, [])

  const getOrder = async() => {
    try {
      const { data } = await getById(match.params.id)
      setMaintenanceOrder(data)
    } catch (error) {
      
    }
  }

  return (
    <MaintenanceDetail maintenanceOrder={maintenanceOrder} />
  )
}

export default withRouter(Detail)
