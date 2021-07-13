import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'

import DriverDetail from '../../../Containers/Driver/Detail'
import { getById } from '../../../Services/Driver'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllOperations } from '../../../Services/Operations'

const Detail = ({
  match
}) => {
  const [driver, setDriver] = useState({
    companyId: null,
    createdAt: null,
    driverLicense: null,
    id: null,
    name: null,
    phone: null,
    updatedAt: null,
    userId: null,
    incidents: [],
  })

  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const [operationsData, setOperationsData] = useState({ rows: [] })

  useEffect(() => {
    getDriver()
    getVehicles({ limit: 100000 })
    getAllOperation({ limit: 100000 })
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getDriver = async() => {
    console.log('fsdfsdf')
    try {
      const { data } = await getById(match.params.id)
      setDriver(data)
    } catch (error) {
      console.log('deu ruim', error)
    }
  }

  const getAllOperation = async (params = {}) => {
    try {
      const { data } = await getAllOperations(params)
      setOperationsData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getVehicles = async (params = {}) => {
    try {
      const { data } = await getAll(params)
      setVehiclesData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      console.log({
        ...values,
        incidentDate: new Date(values.incidentDate)
      })
      success('Incidente criado com sucesso!')
    } catch (error) {
      errorMessage('Não foi criar o incidente!')
    }
  }

  return (
    <DriverDetail
      driver={driver}
      vehiclesSource={vehiclesData.rows}
      operationsSource={operationsData.rows}
      handleSubmit={handleSubmit}
    />
  )
}

export default withRouter(Detail)
