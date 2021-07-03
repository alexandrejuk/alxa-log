import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import ManagerContainer from '../../../Containers/Vehicle/Manager'
import { createVehicle, getAll, getAllVehicleTypes, updateVehicle } from '../../../Services/Vehicle'
import { getAll as getAllOperations } from '../../../Services/Operations'
import { getAll as getAllFleets } from '../../../Services/Fleets'

import {
  compose,
  isNil,
} from 'ramda'

const Manager = ({
}) => {
  const [vehiclesData, setVehiclesData] = useState([])
  const [operationsData, setOperationsData] = useState([])
  const [fleetsData, setFleetsData] = useState([])
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [vehicleSelected, setVehicleSelected] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVehicles()
    getOperations()
    getFleets()
    getVehicleTypes()
  }, [])

  const success = (text) => {
    message.success(text);
  }
  
  const error = (text) => {
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

  const getOperations = async () => {
    try {
      const { data } = await getAllOperations()
      setOperationsData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFleets = async () => {
    try {
      const { data } = await getAllFleets()
      setFleetsData(data)
    } catch (error) {
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
      error('Não foi realizar o cadastro do veículo!')
    }
  }

  const handleEdit = async (values) => {
    consol
    try {
      await updateVehicle(values)
      getVehicles()
      success('Editado veículo com sucesso!')
    } catch (error) {
      error('Não foi realizar a edição do veículo!')
    }
  }

  const handleSelectedVehicle = vehicle => {
    setVehicleSelected(vehicle)
  }

  return (
    <ManagerContainer
      source={vehiclesData}
      operationsSource={operationsData}
      fleetsSource={fleetsData}
      vehicleTypesSource={vehicleTypes}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSelectedVehicle={handleSelectedVehicle}
      vehicleSelected={vehicleSelected}
      handleEdit={handleEdit}

      // clearFilters={clearFilters}
      // closeModalAdd={closeModalAdd}
      // expand={expand}
      // filters={customerSearch}
      // formAdd={formAdd}
      // handleClickEdit={handleClickEdit}
      // handleClickExpand={handleClickExpand}
      // handleFilter={handleFilter}
      // handleSubmitAdd={handleSubmitAdd}
      // modelTitle={isNil(id) ? 'Cadastro cliente' : 'Atualizar cliente'}
      // onChangeSearch={onChangeSearch}
      // openModalAdd={() => setVisibleModalAdd(true)}
      // source={source}
      // visibleModalAdd={visibleModalAdd}
      // loading={loading}
      // onChangeTable={onChangeTable}
      // total={total}
      // page={page}
    />
  )
}

const mapStateToProps = ({ customerSearch }) => ({
  customerSearch
})

const mapDispatchToProps = (dispatch) => ({
  setCustomerSearch: (payload) =>
    dispatch({ type: 'SET_CUSTOMER_GLOBAL_SEARCH', payload }),
  cleanCustomerSearch: () => dispatch({ type: 'CLEAN_CUSTOMER_GLOBAL_SEARCH' })
})

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps))

export default enhanced(Manager)
