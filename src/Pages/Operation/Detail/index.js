import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import GAInitialize from '../../../utils/ga'

import BranchDetail from '../../../Containers/Branch/Detail'
import { getById, getSummary } from '../../../Services/Operations'
import { getMaintenanceOperationId } from '../../../Services/MaintenanceOrders'

const Detail = ({
  match,
  history,
}) => {
  const [operation, setOperation] = useState({})
  const [chartData, setChartData] = useState([])
  const [offset, setoffset] = useState(1)
  const [datasource, setDatasource] = useState({ rows: [], count: 0 })

  
  GAInitialize(`/operation/${match.params.id}`)

  useEffect(() => {
    getOperation()
    summaryChart()
    getAllMaintenanceOperation({ operationId: match.params.id })
  }, [])

  const getOperation = async() => {
    try {
      const { data } = await getById(match.params.id)
      setOperation(data)
    } catch (error) {
      console.log('deu ruim', error)
    }
  }

  const summaryChart = async () => {
    try {
      const { data } = await getSummary(match.params.id)
      setChartData(data)
    } catch (error) {
      console.log('não foi possivel', error)
    }
  }

  const getAllMaintenanceOperation = async (query) => {
    try {
      const { data } = await getMaintenanceOperationId(query)
      setDatasource(data)
    } catch (error) {
      console.log('não foi possivel', error)
    }
  } 

  const handleChangeTableEvent = ({ current }) => {
    setoffset(current)
    const query = { offset: (current - 1), companyId: match.params.id }
    getAllMaintenanceOperation(query)
  }

  return (
    <BranchDetail
      operation={operation}
      chartData={chartData}
      handleChangeTableEvent={handleChangeTableEvent}
      offset={offset}
      datasource={datasource}
      gotoDetailOrder={id => history.push(`/logged/maintenance-detail/${id}`)}
    />
  )
}

export default withRouter(Detail)
