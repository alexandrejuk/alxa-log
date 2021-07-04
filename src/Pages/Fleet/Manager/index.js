import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Fleet/Manager'
import {   
  getAll, 
  createFleet,
  updateFleet  
} from '../../../Services/Fleets'

const Manager = ({
  history,
}) => {
  const [fleetData, setFleetData] = useState([])
  const [fleetSelected, setFleetSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getFleets()

    if(!search && localStorage.getItem('fleetSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('fleetSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('fleetSearch'))
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
      setFleetData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createFleet(values)
      getFleets()
      success('Cadastro da frota realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro da frota!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateFleet(values)
      getFleets()
      success('Editado frota com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da frota!')
    }
  }

  const handleSelectedFleet = fleet => {
    setFleetSelected(fleet)
  }

  const handleFilter = () => {
    localStorage.setItem('fleetSearch', `?name=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('fleetSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      source={fleetData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedFleet={handleSelectedFleet}
      fleetSelected={fleetSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
