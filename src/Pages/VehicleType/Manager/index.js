import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/VehicleType/Manager'
import {   
  getAll, 
  createVehicleType,
  updateVehicleType  
} from '../../../Services/VehicleType'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [vehicleTypeData, setVehicleTypeData] = useState([])
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(0)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    let query = {} 
    const searchLocaStorage = localStorage.getItem('vehicleTypeSearch')
  
    if(!search && searchLocaStorage) {
      history.push({
        pathname,
        search: `?name=${searchLocaStorage}`
      })
      setSearchValue(searchLocaStorage)
      query = { name: searchLocaStorage }
    }
    getVehicleTye(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getVehicleTye = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setVehicleTypeData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createVehicleType(values)
      getFleets()
      success('Cadastro da frota realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro da frota!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateVehicleType(values)
      getFleets()
      success('Editado frota com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da frota!')
    }
  }

  const handleSelectedVehicleType = fleet => {
    setVehicleTypeSelected(fleet)
  }

  const handleFilter = async () => {
    if(isEmpty(searchValue)) {
      return null
    }

    localStorage.setItem('vehicleTypeSearch', `?name=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}`
    })

    getVehicleTye({ name: searchValue })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = async () => {
    setSearchValue('')
    localStorage.removeItem('vehicleTypeSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getVehicleTye({})

  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(offset + 1)
    let query = { offset: (current - 1) }
    if (searchValue) {
      query = { ...query, name: searchValue }
    }

    getVehicleTye(query)
  }

  return (
    <ManagerContainer
      source={vehicleTypeData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedVehicleType={handleSelectedVehicleType}
      vehicleTypeSelected={vehicleTypeSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
      offset={offset}
      handleChangeTableEvent={handleChangeTableEvent}
    />
  )
}

export default withRouter(Manager)
