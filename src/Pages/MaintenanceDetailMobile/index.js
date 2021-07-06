import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'
import { getById, updateEvents } from '../../Services/MaintenanceOrders'
import MaintenanceDetailMobile from '../../Containers/MaintenanceDetailMobile'
import { getAll } from '../../Services/Driver'

const Manager = ({
  history,
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
    plateHorser: null,
    priority: null,
    service: null,
    serviceDescription: null,
    status: null,
    updatedAt: null,
    userId: null,
  })

  const [driversSource, setDriversSource] = useState([])

  useEffect(() => {
    getOrder()
    getAllDriver()
  }, [])

  const getAllDriver = async () => {
    try {
      const { data } = await getAll()
      setDriversSource(data)
    } catch (error) {
      
    }
  }

  const handleSubmit = async (values) => {
    try {
      const { data } = updateEvents(match.params.id, values)
      setMaintenanceOrder(data)
    } catch (error) {
      
    }
  }

  const getOrder = async() => {
    try {
      const { data } = await getById(match.params.id)
      setMaintenanceOrder(data)
    } catch (error) {
      
    }
  }

  const goBack = () => history.push('/logged/mobile-maintenance')

  return (
    <MaintenanceDetailMobile 
      goBack={goBack}
      handleSubmit={handleSubmit}
      maintenanceOrder={maintenanceOrder}
      driversSource={driversSource}
    />
  )
}

export default withRouter(Manager)
