import React, { useEffect, useState } from 'react'
import HomeContainer from '../../Containers/Home'
import {
  getByStatus, 
  // getByStatusCompany,
  getByStatusOperation,
} from '../../Services/Summary'

const Home = () => {
  const [homeState] = useState({
    customers: null,
    orders: null,
    ordersTotal: [],
    ordersToday: []
  })
  const [orderStatus, setOrderStatus] = useState([])
  // const [orderCompanyStatus, setOrderCompanyStatus] = useState([])
  const [orderOperationStatus, setOrderOperationStatus] = useState([])

  useEffect(() => {
    getByStatusAll()
    // getByCompanyAll()
    getByOperationAll()
  }, [])

  const getByStatusAll = async () => {
    try {
      const { data } = await getByStatus()
      setOrderStatus(data)
    } catch (error) {
      console.log('cannot find values of dashboard!')
    }
  }

  // const getByCompanyAll = async () => {
  //   try {
  //     const { data } = await getByStatusCompany()
  //     setOrderCompanyStatus(data)
  //   } catch (error) {
  //     console.log('cannot find values of dashboard!')
  //   }
  // }

  const getByOperationAll = async () => {
    try {
      const { data } = await getByStatusOperation()
      setOrderOperationStatus(data)
    } catch (error) {
      console.log('cannot find values of dashboard!')
    }
  }

  return (
    <HomeContainer
      orderStatus={orderStatus}
      // orderCompanyStatus={orderCompanyStatus}
      orderOperationStatus={orderOperationStatus}
    />
  )
}

export default Home
