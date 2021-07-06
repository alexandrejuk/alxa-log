import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Vehicle/Manager'
import { createVehicle, getAll, getAllVehicleTypes, updateVehicle } from '../../../Services/Vehicle'

const Manager = ({
  history,
}) => {
  const [vehiclesData, setVehiclesData] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getVehicles()
    getVehicleTypes()

    if(!search && localStorage.getItem('vehicleSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('vehicleSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('vehicleSearch'))
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


  const getVehicleTypes = async () => {
    try {
      const { data } = await getAllVehicleTypes()
      setVehicleTypes(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createVehicle(values)
      getVehicles()
      success('Cadastro de veículo realizado com sucesso!')
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
    localStorage.setItem('vehicleSearch', `?fleet=${searchValue}&plate=${searchValue}`)
    history.push({
      pathname,
      search: `?fleet=${searchValue}&plate=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('vehicleSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      source={vehiclesData}
      vehicleTypesSource={vehicleTypes}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedVehicle={handleSelectedVehicle}
      vehicleSelected={vehicleSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
