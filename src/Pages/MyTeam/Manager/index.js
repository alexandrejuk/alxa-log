import React, { useEffect, useState } from 'react'
import { message } from 'antd'
import { useLocation, withRouter } from 'react-router-dom'
import { cpf } from 'cpf-cnpj-validator'

import ManagerContainer from '../../../Containers/MyTeam/Manager'
import { createUser, getAll, updateUser } from '../../../Services/User'
import { isEmpty } from 'ramda'

const Manager = ({
  history,
}) => {
  const [usersData, setUsersData] = useState({ rows: [] })
  const [myTeamSelected, setMyTeamSelected] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [offset, setoffset] = useState(0)

  const [loading, setLoading] = useState(true)
  const { search, pathname } = useLocation()

  useEffect(() => {
    let query = {}
    getVehicleTypes()
    const searchLocalStorage = localStorage.getItem('myteamSearch')
    if(!search && searchLocalStorage) {
      history.push({
        pathname,
        search: cpf.isValid(searchLocalStorage) ? `?document=${searchLocalStorage}` : `?name=${searchLocalStorage}`
      })
      setSearchValue(searchLocalStorage)
      query = cpf.isValid(searchLocalStorage) ? { document: searchLocalStorage.replace(/\D/g, '') } : { name: searchLocalStorage }
    }
    getUsers(query)
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const errorMessage = (text) => {
    message.error(text)
  }

  const getUsers = async (params = {}) => {
    setLoading(true)
    try {
      const { data } = await getAll(params)
      setUsersData(data)
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
      await createUser({...values, document: values.document.replace(/\D/g, '') })
      getUsers()
      success('Cadastro do usuário realizado com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar o cadastro do usuário!')
    }
  }

  const handleEdit = async (values) => {
    try {
      await updateUser({...values, document: values.document.replace(/\D/g, '') })
      getUsers()
      success('Editado usuário com sucesso!')
    } catch (error) {
      errorMessage('Não foi realizar a edição do usuário!')
    }
  }

  const handleSelectedMyTeam = user => {
    setMyTeamSelected(user)
  }

  const handleFilter = () => {
    if (isEmpty(searchValue)) {
      return null
    }

    const queryLocal = cpf.cpf(searchValue) ? `?document=${searchValue}` : `?name=${searchValue}`
    const query = cpf.cpf(searchValue) ? { document: searchValue.replace(/\D/g, '') } : { name: searchValue }
    localStorage.setItem('myteamSearch', searchValue)
    history.push({
      pathname,
      search: queryLocal
    })

    getUsers(query)
  }

  const handleFilterOnchange = value => {
    setSearchValue(value.target.value)
  }

  const clearFilter = () => {
    setSearchValue('')
    localStorage.removeItem('myteamSearch')
    setSearchValue('')
    history.push({
      pathname,
      search: ''
    })
    setoffset(0)
    getUsers()
  }

  const handleChangeTableEvent = ({ current }) => {
    setoffset(offset + 1)
    let query = { offset: (current - 1) }
    if (searchValue) {
      const params = cpf.isValid(searchValue) ? { document: searchValue.replace(/\D/g, '') } : { name: searchValue }
      query = { ...query, ...params }
    }

    getUsers(query)
  }

  return (
    <ManagerContainer
      source={usersData}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedMyTeam={handleSelectedMyTeam}
      myTeamSelected={myTeamSelected}
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