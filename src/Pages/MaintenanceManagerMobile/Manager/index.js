import React, { useState } from 'react'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'
import { getByPlate } from '../../../Services/MaintenanceOrders'
import ManagerContainer from '../../../Containers/MaintenanceManagerMobile'

const Manager = ({
  history,
}) => {


  const [searchVehicle, setSearchVehicle] = useState('')
  const [searchButton, setSearchButton] = useState(true)
  const [enableQrCode, setEnableQrCode] = useState(false)
  const [showModalMobile, setShowModalMobile] = useState(false)

  const handleScan = data => {
    if (data) {
      return history.push(`/logged/mobile-maintenance-detail/${data}`)
    }
  }

  const handleChange = data => {
    setSearchVehicle(data.target.value)
    if(data.target.value.length === 0) {
      return setSearchButton(true)
    }
    return setSearchButton(false)
  }

  const handleClick = async () => {
    try {
      const { data } = await getByPlate({ plate: searchVehicle.replace(/\D/g, '') })
      if (data.length > 0) {
        return history.push(`/logged/mobile-maintenance-detail/${data.id}`)
      } else {
        message.info('Não foi possível localizar nenhuma ordem de manutenção!')
      }
    } catch (error) {
      message.error('Não foi possível localizar as manutenções!')
    }
  }


  const handleError = () => {
    setEnableQrCode(false)
    message.error('Não foi possível ler o qr code!')
  }

  return (
    <ManagerContainer
      searchVehicle={searchVehicle}
      searchButton={searchButton}
      handleScan={handleScan}
      handleError={handleError}
      handleChange={handleChange}
      handleClick={handleClick}
      enableQrCode={enableQrCode}
      setEnableQrCode={setEnableQrCode}
      showModalMobile={showModalMobile}
      setShowModalMobile={setShowModalMobile}
      setSearchVehicle={setSearchVehicle}
      setSearchButton={setSearchButton}
    />
  )
}

export default withRouter(Manager)
