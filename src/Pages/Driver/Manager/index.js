import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Driver/Manager'
import {   
  getAll, 
  getById,
  createDriver, 
  updateDriver,  
} from '../../../Services/Driver'

const Manager = ({
  history,
}) => {
  const [driverData, setDriverData] = useState([])
  const [driverSelected, setDriverSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getDrivers()

    if(!search && localStorage.getItem('driverSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('driverSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('driverSearch'))
      setSearchValue(searchParams.get('cnh'))
    }
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getDrivers = async () => {
    setLoading(true)
    try {
      const { data } = await getAll()
      setDriverData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createDriver(values)
      getDrivers()
      success('Cadastro de motorista realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro do motorista!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateDriver(values)
      getDrivers()
      success('Editado motorista com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição do motorista!')
    }
  }

  const handleSelectedDriver = driver => {
    setDriverSelected(driver)
  }

  const handleFilter = () => {
    localStorage.setItem('driverSearch', `?name=${searchValue}&cnh=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}&cnh=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('driverSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      source={driverData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedDriver={handleSelectedDriver}
      driverSelected={driverSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
