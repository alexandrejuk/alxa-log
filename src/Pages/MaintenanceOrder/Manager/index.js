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
  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const [maintenanceOrdersData, setMaintenanceOrdersData] = useState({ rows: [] })
  const [driversData, setDriversData] = useState({ rows: [] })
  const [branchsData, setBranchsData] = useState({ rows: [] })
  const [operationsData, setOperationsData] = useState({ rows: [] })
  const [offset, setoffset] = useState(0)

  const [maintenanceSelected, setMaintenanceSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getVehicles({ limit: 100000 })
    getAllDriver({ limit: 100000 })
    getAllBranch({ limit: 400 })
    getAllOperation({ limit: 100000 })
    let query = {}

    if(!search && localStorage.getItem('maintenanceSearch')) {
      const searchValueLocal = localStorage.getItem('maintenanceSearch')
      history.push({
        pathname,
        search:  `?plate=${searchValueLocal}`
      })
      setSearchValue(searchValueLocal)
      query = { plate: searchValueLocal }
    }
    getAllMaintenances(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getVehicles = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setVehiclesData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getAllMaintenances = async (params = {}) => {
    try {
      const { data } = await getAllMaintenanceOrders(params)
      setMaintenanceOrdersData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllBranch = async (params = {}) => {
    try {
      const { data } = await getAllBranchs(params)
      setBranchsData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllDriver = async (params = {}) => {
    try {
      const { data } = await getAllDrivers(params)
      setDriversData(data)
    } catch (error) {
      console.log(error)
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

  const handleSubmit = async (values) => {

    const findDriver = driversData.rows.find(driver => driver.id === values.driverId)
    try {
      await createMaintenanceOrder({
        ...values,
        driverMain: findDriver.name,
        driverPhoneMain: findDriver.phone,
        driverMainLicense: findDriver.driverLicense,
        maintenanceDate: new Date(values.maintenanceDate)
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
    localStorage.setItem('maintenanceSearch', searchValue)
    history.push({
      pathname,
      search: `?plate=${searchValue}`
    })
    getAllMaintenances({ plate: searchValue })
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
    setoffset(0)
    getAllMaintenances()
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(offset + 1)
    let query = { offset: (current - 1) }
    if (searchValue) {
      query = { ...query }
    }

    getAllMaintenances(query)
  }

  return (
    <ManagerContainer
      vehiclesSource={vehiclesData.rows}
      branchsSource={branchsData.rows}
      driversSource={driversData.rows}
      operationsSource={operationsData.rows}
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
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      gotoDetail={id => history.push(`/logged/maintenance-detail/${id}`)}
    />
  )
}

export default withRouter(Manager)
