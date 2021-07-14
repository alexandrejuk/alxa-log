import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import NoData from '../../../../Assets/noData.svg'
import { cnpj } from 'cpf-cnpj-validator'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Razão social',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Cnpj',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (document) => cnpj.format(document)
  },
  {
    title: 'Endereço',
    dataIndex: 'address',
    key: 'address',
    fixed: 'left',
    render: (_, source) => `${source.city}/${source.state} `
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) =>  <Button type="link" onClick={() => handleClickEdit(source)}>
      Editar
    </Button>
  }
]

const BranchList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, offset }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ pageSize: 20, total: datasource.count, current: offset }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit })} 
        loading={loading}
        dataSource={datasource.rows} 
      />
    </ConfigProvider>
  )
}

export default BranchList
