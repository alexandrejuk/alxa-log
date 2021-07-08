import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Space, Tag } from 'antd'
import NoData from '../../../../Assets/noData.svg'
import formattedDate from '../../../../utils/parserDate'
import diffTime from '../../../../utils/permananceTime'

const status = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

const services = {
  corrective: 'Corretiva',
  preventive: 'Preventiva'
}

const parseStatusColor = {
  'solicitation': 'magenta',
  'check-in': 'red',
  'avaiable': 'volcano',
  'parking': 'orange',
  'courtyard': 'gold',
  'awaiting_repair': 'lime',
  'dock': 'green',
  'wash': 'cyan',
  'supply': 'blue',
  'check-out': 'geekblue',
}

const parseStatus = {
  'solicitation': 'Solicitação',
  'check-in': 'Entrada',
  'avaiable': 'Liberado',
  'parking': 'Estacionar',
  'courtyard': 'Pátio',
  'awaiting_repair': 'Aguardando peça',
  'dock': 'Doca',
  'wash': 'Lavar',
  'supply': 'Abastecer',
  'check-out': 'Saída',
}

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
    render: value => <Tag color={parseStatusColor[value]}>{parseStatus[value]}</Tag>
  },
  {
    title: 'Prioridade',
    dataIndex: 'priority',
    key: 'priority',
    fixed: 'left',
    render: (value) => status[value]
  },
  {
    title: 'Tipo de Serviço',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left',
    render: value => services[value]
  },
  {
    title: 'Permanência',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left',
    render: (_, source) => diffTime(source.createdAt, source.updatedAt, source.status)
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

const MaintenanceList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, handleShowVoucher, offset }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ pageSize: 20, total: datasource.count, current: (offset + 1) }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit, handleShowVoucher })} 
        loading={loading}
        dataSource={datasource.rows} 
      />
    </ConfigProvider>
  )
}

export default MaintenanceList
