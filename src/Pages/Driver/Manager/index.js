import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { validateBr } from 'js-brasil'

import ManagerContainer from '../../../Containers/Driver/Manager'
import {   
  getAll, 
  createDriver, 
  updateDriver,  
} from '../../../Services/Driver'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [driverData, setDriverData] = useState([])
  const [driverSelected, setDriverSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    let query = {} 
    const searchLocalStorage = localStorage.getItem('driverSearch')
    if(!search && searchLocalStorage) {
      history.push({
        pathname,
        search: validateBr.cnh(searchValue) ? `?driverLicense=${searchLocalStorage}` : `?name=${searchLocalStorage}`
      })
      setSearchValue(searchLocalStorage)
      query = validateBr.cnh(searchValue) ? { driverLicense: searchLocalStorage } : { name: searchLocalStorage }
    }
    getDrivers(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getDrivers = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
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
    if (isEmpty(searchValue)) {
      return null
    }

    const isValidCnh = validateBr.cnh(searchValue)
    let query = {
      name: searchValue
    }

    const searchLocal = isValidCnh ? `?driverLicense=${searchValue}` : `?name=${searchValue}`

    if (isValidCnh) {
      query = {
        driverLicense: searchValue
      }
    
    }

    localStorage.setItem('driverSearch', searchValue)
    history.push({
      pathname,
      search: searchLocal
    })

    getDrivers(query)
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('driverSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    getDrivers({})
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
