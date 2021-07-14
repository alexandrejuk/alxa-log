import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Vehicle/Manager'
import { createVehicle, getAll, getAllVehicleTypes, updateVehicle } from '../../../Services/Vehicle'
import { validateBr } from 'js-brasil'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [vehiclesData, setVehiclesData] = useState({ rows: [] })
  const [vehicleTypes, setVehicleTypes] = useState({ rows: [] })
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(0)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    let query = {}
    getVehicleTypes({ limit: 10000 })
    const searchLocalStorage = localStorage.getItem('vehicleSearch')
    if(!search && searchLocalStorage) {
      history.push({
        pathname,
        search: validateBr.placa(searchLocalStorage) ? `?plate=${searchLocalStorage}` : `?fleet=${searchLocalStorage}`
      })
      setSearchValue(searchLocalStorage)
      query = validateBr.placa(searchLocalStorage) ? { plate: searchLocalStorage } : { fleet: searchLocalStorage }
    }
    getVehicles(query)
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


  const getVehicleTypes = async (params = {}) => {
    try {
      const { data } = await getAllVehicleTypes(params)
      setVehicleTypes(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createVehicle({
        ...values, 
        plate: values.plate.toLocaleUpperCase(),
        fleet: values.fleet.toLocaleUpperCase(),
      })
      success('Cadastro de veículo realizado com sucesso!')
      getVehicles()
    } catch (error) {
      errorMessage('Não foi realizar o cadastro do veículo!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateVehicle(values)
      getVehicles()
      success('Editado veículo com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição do veículo!')
    }
  }

  const handleSelectedVehicle = vehicle => {
    setVehicleSelected(vehicle)
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const queryLocal = validateBr.placa(searchValue) ? `?plate=${searchValue}` : `?fleet=${searchValue}`
    const query = validateBr.placa(searchValue) ? { plate: searchValue } : { fleet: searchValue }
    localStorage.setItem('vehicleSearch', searchValue)
    history.push({
      pathname,
      search: queryLocal
    })

    getVehicles(query)
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('vehicleSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getVehicles()
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    let query = { offset: (current - 1) }
    if (searchValue) {
      const params = validateBr.placa(searchValue) ? { plate: searchValue } : { fleet: searchValue }
      query = { ...query, ...params }
    }

    getVehicles(query)
  }

  return (
    <ManagerContainer
      source={vehiclesData}
      vehicleTypesSource={vehicleTypes.rows}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedVehicle={handleSelectedVehicle}
      vehicleSelected={vehicleSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
    />
  )
}

export default withRouter(Manager)
