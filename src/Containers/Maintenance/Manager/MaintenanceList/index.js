import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Space } from 'antd'
import NoData from '../../../../Assets/noData.svg'
import formattedDate from '../../../../utils/parserDate'

const columns = ({ handleClickEdit, handleShowVoucher }) => [
  {
    title: 'Data da manutenção',
    dataIndex: 'maintenanceDate',
    key: 'maintenanceDate',
    fixed: 'left',
    render: (maintenanceDate) => formattedDate(maintenanceDate, 'DD MMM YYYY')
  },
  {
    title: 'Placa do Cavalo',
    dataIndex: 'plateHorse',
    key: 'plateHorse',
    fixed: 'left',
  },
  {
    title: 'Placa da Carreta',
    dataIndex: 'plateCart',
    key: 'plateCart',
    fixed: 'left',
  },
  {
    title: 'Centro de custo',
    dataIndex: 'costCenter',
    key: 'fleet',
    fixed: 'left',
  },
  {
    title: 'Motorista',
    dataIndex: 'driverMain',
    key: 'driverMain',
    fixed: 'left',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
  },
  {
    title: 'Prioridade',
    dataIndex: 'priority',
    key: 'priority',
    fixed: 'left'
  },
  {
    title: 'Tipo de Serviço',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left'
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => 
    <Space>
      {source.status === 'solicitation' && (
        <Button type="link" onClick={() => handleClickEdit(source)}>
          Editar
        </Button>
      )}
      <Button type="link" onClick={() => handleShowVoucher(source)}>
        Voucher
      </Button>
    </Space>
  }
]

const MaintenanceList = ({ datasource, handleClickEdit, loading, onChangeTable, total, page, handleShowVoucher }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ total: 5000, current: 1 }}
        onChange={onChangeTable}
        columns={columns({ handleClickEdit, handleShowVoucher })} 
        loading={loading}
        dataSource={datasource} 
      />
    </ConfigProvider>
  )
}

export default MaintenanceList
