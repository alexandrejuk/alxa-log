import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/VehicleType/Manager'
import {   
  getAll, 
  createVehicleType,
  updateVehicleType  
} from '../../../Services/VehicleType'

const Manager = ({
  history,
}) => {
  const [vehicleTypeData, setVehicleTypeData] = useState([])
  const [vehicleTypeSelected, setVehicleTypeSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getFleets()

    if(!search && localStorage.getItem('vehicleTypeSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('vehicleTypeSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('vehicleTypeSearch'))
      setSearchValue(searchParams.get('name'))
    }
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getFleets = async () => {
    setLoading(true)
    try {
      const { data } = await getAll()
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

  const handleFilter = () => {
    localStorage.setItem('vehicleTypeSearch', `?name=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('vehicleTypeSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
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
    />
  )
}

export default withRouter(Manager)
