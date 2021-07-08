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
    plateHorse: null,
    priority: null,
    service: null,
    serviceDescription: null,
    status: null,
    updatedAt: null,
    userId: null,
  })

  const [driversSource, setDriversSource] = useState([])
  const [showModal, setShowModal] = useState(false)

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
      if (values.status === 'supply' && !maintenanceOrder.plateHorse) {
        throw new Error('Not allow add supply to plateCart!')
      }

      const { data } = await updateEvents(match.params.id, values)
      setMaintenanceOrder(data)
      message.success('Eventos atualizado com sucesso!');
      setShowModal(false)
    } catch (error) {
      message.error('Não foi possível adicionar esse evento!');
      setShowModal(false)
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
      driversSource={driversSource.rows}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

export default withRouter(Manager)
