import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'

import ManagerContainer from '../../../Containers/Operation/Manager'
import { getAll as getAllBranchs } from '../../../Services/Branch'
import { 
  createOperations, 
  getAll, 
  updateOperations
} from '../../../Services/Operations'

const Manager = ({
  history,
}) => {
  const [operationData, setOperationData] = useState([])
  const [branchsData, setBranchsDataData] = useState([])

  const [operationSelected, setOperationSelected] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    getOperations()
    getAllBranch()

    if(!search && localStorage.getItem('operationSearch')) {
      history.push({
        pathname,
        search: localStorage.getItem('operationSearch')
      })
      const searchParams = new URLSearchParams(localStorage.getItem('operationSearch'))
      setSearchValue(searchParams.get('fleet'))
    }
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getOperations = async () => {
    setLoading(true)
    try {
      const { data } = await getAll()
      setOperationData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const getAllBranch = async () => {
    try {
      const { data } = await getAllBranchs()
      setBranchsDataData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (values) => {
    try {
      await createOperations(values)
      getOperations()
      success('Operação criada com sucesso!')
    } catch (error) {
      errorMessage('Não foi criar a operação!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateOperations(values)
      getOperations()
      success('Operação editada com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição da operação!')
    }
  }

  const handleSelectedOperation = values => {
    setOperationSelected(values)
  }

  const handleFilter = () => {
    localStorage.setItem('operationSearch', `?name=${searchValue}&branch=${searchValue}`)
    history.push({
      pathname,
      search: `?name=${searchValue}&branch=${searchValue}`
    })
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    localStorage.removeItem('operationSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
  }

  return (
    <ManagerContainer
      source={operationData}
      branchsSource={branchsData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedOperation={handleSelectedOperation}
      operationSelected={operationSelected}
      handleEdit={handleEdit}
      searchValue={searchValue}
      handleFilter={handleFilter}
      handleFilterOnchange={handleFilterOnchange}
      clearFilter={clearFilter}
    />
  )
}

export default withRouter(Manager)
