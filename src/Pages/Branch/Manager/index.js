import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Branch/Manager'
import {   
  getAll, 
  getById,
  createBranch, 
  updateBranch,  
} from '../../../Services/Branch'

const Manager = ({
  history,
}) => {
  const [branchData, setBranchData] = useState([])
  const [branchSelected, setbranchSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getDrivers()

    if(!search && localStorage.getItem('branchSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('branchSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('branchSearch'))
      setSearchValue(searchParams.get('name'))
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
      setBranchData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createBranch(values)
      getDrivers()
      success('Cadastro da unidade realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro da unidade!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateBranch(values)
      getDrivers()
      success('Editado unidade com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da unidade!')
    }
  }

  const handleSelectedBranch = driver => {
    setbranchSelected(driver)
  }

  const handleFilter = () => {
    localStorage.setItem('branchSearch', `?name=${searchValue}&cnh=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}&cnh=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('branchSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      source={branchData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedBranch={handleSelectedBranch}
      branchSelected={branchSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
