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
  'solicitation': '#5DA0FC',
  'check-in': '#268E86',
  'avaiable': '#F29F03',
  'parking': '#1772C9',
  'courtyard': '#EA5656',
  'awaiting_repair': '#7550D8',
  'dock': '#2D2D2D',
  'wash': '#D588F2',
  'supply': '#17C9B2',
  'check-out': '#264ABE',
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

const columns = ({ handleClickEdit, handleShowVoucher, gotoDetail }) => [
  {
    title: 'Data da manutenção',
    dataIndex: 'maintenanceDate',
    key: 'maintenanceDate',
    fixed: 'left',
    render: (maintenanceDate) => formattedDate(maintenanceDate, 'DD MMM YYYY')
  },
  {
    title: 'Placa Manutenção',
    dataIndex: 'plateCart',
    key: 'plateCart',
    fixed: 'left',
  },
  {
    title: 'Motorista',
    dataIndex: 'maintenanceOrderDrivers',
    key: 'maintenanceOrderDrivers',
    fixed: 'left',
    render: (_, source) => source.maintenanceOrderDrivers[0].driver.name

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
    render: (id, source) => 
    <Space>
      {source.status === 'solicitation' && (
        <Button type="link" onClick={() => handleClickEdit(source)}>
          Editar
        </Button>
      )}

      {source.status !== 'solicitation' && (
        <Button type="link" onClick={() => gotoDetail(id)}>
          Detalhes
        </Button>
      )}

      <Button type="link" onClick={() => handleShowVoucher(source)}>
        Voucher
      </Button>
    </Space>
  }
]

const MaintenanceList = ({ gotoDetail, datasource, handleClickEdit, loading, handleChangeTableEvent, handleShowVoucher, offset }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ pageSize: 20, total: datasource.count, current: offset }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit, handleShowVoucher, gotoDetail })} 
        loading={loading}
        dataSource={datasource.rows} 
      />
    </ConfigProvider>
  )
}

export default MaintenanceList
