import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { getMobileQrCode } from '../../Services/MaintenanceOrders'
import VoucherMobile from '../../Containers/VoucherMobile'

const MaintenanceQrcode = ({
  match
}) => {
  const [maintenanceOrder, setMaintenanceOrder] = useState({
    company: {
      street: null,
    },
    companyId: null,
    costCenter: null,
    createdAt: null,
    driverMain: null,
    driverPhoneMain: null,
    driverPhoneSecondary: null,
    driverSecondary: null,
    id: 'noqrcode',
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
  })


  useEffect(() => {
    getOrder()
  }, [])

  const getOrder = async() => {
    try {
      const { data } = await getMobileQrCode(match.params.id)
      if(data) {
        setMaintenanceOrder(data)
      }
    } catch (error) {

    }
  }

  return (
    <VoucherMobile 
      maintenanceOrder={maintenanceOrder}
    />
  )
}

export default withRouter(MaintenanceQrcode)
