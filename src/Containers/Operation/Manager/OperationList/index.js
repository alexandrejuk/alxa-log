import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Operação',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Filial',
    dataIndex: 'branch',
    key: 'branch',
    fixed: 'left',
  },
  {
    title: 'Vagas contratadas',
    dataIndex: 'vacancy',
    key: 'vacancy',
    fixed: 'left',
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => 
      <Button type="link" onClick={() => handleClickEdit(source)}>
        Editar
      </Button>
  }
]

const OperationList = ({ datasource, handleClickEdit, loading, onChangeTable, total, page }) => {
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

export default OperationList
