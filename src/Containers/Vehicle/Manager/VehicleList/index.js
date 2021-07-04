import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Tipo de Veículo',
    dataIndex: 'vehicleType',
    key: 'vehicleType',
    fixed: 'left'
  },
  {
    title: 'Placa',
    dataIndex: 'plate',
    key: 'plate',
    fixed: 'left',
  },
  {
    title: 'Frota',
    dataIndex: 'fleet',
    key: 'fleet',
    fixed: 'left',
  },
  {
    title: 'Operação principal',
    dataIndex: 'mainOperation',
    key: 'mainOperation',
    fixed: 'left'
  },
  {
    title: 'Situação',
    dataIndex: 'situation',
    key: 'situation',
    fixed: 'left'
  },
  {
    title: 'Última manutenção',
    dataIndex: 'lastMaintenance',
    key: 'lastMaintenance',
    fixed: 'left'
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) =>  <Button type="link" onClick={() => handleClickEdit(source)}>
      Editar
    </Button>
  }
]

const VehicleList = ({ datasource, handleClickEdit, loading, onChangeTable, total, page }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total: 5000, current: 1 }}
        onChange={onChangeTable}
        columns={columns({ handleClickEdit })} 
        loading={loading}
        dataSource={datasource} 
      />
    </ConfigProvider>
  )
}

export default VehicleList
