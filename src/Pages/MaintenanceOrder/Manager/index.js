import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Maintenance/Manager'
import { getAll } from '../../../Services/Vehicle'
import { getAll as getAllBranchs } from '../../../Services/Branch'
import { getAll as getAllDrivers } from '../../../Services/Driver'
import { getAll as getAllOperations } from '../../../Services/Operations'

import { 
  createMaintenanceOrder, 
  getAll as getAllMaintenanceOrders, 
  updateMaintenanceOrder
} from '../../../Services/MaintenanceOrders'

const Manager = ({
  history,
}) => {
  const [vehiclesData, setVehiclesData] = useState([])
  const [maintenanceOrdersData, setMaintenanceOrdersData] = useState([])
  const [driversData, setDriversData] = useState([])
  const [branchsData, setBranchsData] = useState({ rows: [] })
  const [operationsData, setOperationsData] = useState({ rows: [] })

  const [maintenanceSelected, setMaintenanceSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getVehicles()
    getAllDriver()
    getAllBranch()
    getAllOperation()
    getAllMaintenances()

    if(!search && localStorage.getItem('maintenanceSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('maintenanceSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('maintenanceSearch'))
      setSearchValue(searchParams.get('fleet'))
    }
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getVehicles = async () => {
    setLoading(true)
    try {
      const { data } = await getAll()
      setVehiclesData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getAllMaintenances = async () => {
    try {
      const { data } = await getAllMaintenanceOrders()
      setMaintenanceOrdersData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllBranch = async () => {
    try {
      const { data } = await getAllBranchs()
      setBranchsData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllDriver = async () => {
    try {
      const { data } = await getAllDrivers()
      setDriversData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllOperation = async () => {
    try {
      const { data } = await getAllOperations()
      setOperationsData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {

    const findDriver = driversData.find(driver => driver.id === values.driverId)
    try {
      await createMaintenanceOrder({
        ...values,
        driverMain: findDriver.name,
        driverPhoneMain: findDriver.phone,
        driverMainLicense: findDriver.driverLicense,
        maintenanceDate: new Date()
      })
      getAllMaintenances()
      success('Manutenção criada com sucesso!')
    } catch (error) {
      errorMessage('Não foi criar a manutenção!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateMaintenanceOrder(values)
      getAllMaintenances()
      success('Manuntenção editada com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da manutenção!')
    }
  }

  const handleSelectedMaintenance = values => {
    setMaintenanceSelected(values)
  }

  const handleFilter = () => {
    localStorage.setItem('maintenanceSearch', `?fleet=${searchValue}&plateHorse=${searchValue}&plateCart=${searchValue}&maintenanceDate=${searchValue}`)
    history.push({
      pathname,
      search: `?fleet=${searchValue}&plateHorse=${searchValue}&plateCart=${searchValue}&maintenanceDate=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('maintenanceSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      vehiclesSource={vehiclesData}
      branchsSource={branchsData.rows}
      driversSource={driversData}
      operationsSource={operationsData}
      maintenanceOrdersSource={maintenanceOrdersData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedMaintenance={handleSelectedMaintenance}
      maintenanceSelected={maintenanceSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
