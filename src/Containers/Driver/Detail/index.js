import React, { useState } from 'react'
import { Row, Col, Card, Typography, Table, Button } from 'antd'
import BarChart from './BarChart'
import { PlusOutlined } from '@ant-design/icons'
import IncidentForm from './IncidentForm'

const columns = ({ handleClickSelected }) => [
  {
    title: 'Data',
    dataIndex: 'createdAt',
    key: 'createdAt',
    fixed: 'left'
  },
  {
    title: 'Operação',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'left',
  },
  {
    title: 'Veículo',
    dataIndex: 'vehicle',
    key: 'vehicle',
    fixed: 'left',
  },
  {
    title: 'Tipo de incidente',
    dataIndex: 'vehicle',
    key: 'vehicle',
    fixed: 'left',
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) =>  <Button type="link" onClick={() => handleClickSelected(source)}>
      Detalhes
    </Button>
  }
]

const { Text, Title } = Typography 
const Detail = ({
  driver,
  handleClickSelected,
  vehiclesSource,
  operationsSource,
  handleSubmit
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={8}>
              <Text>Nome</Text><br />
              <Text><strong>{driver.name || '-' }</strong></Text>
            </Col>
            <Col span={8}>
              <Text>CNH</Text><br />
              <Text><strong>{driver.driverLicense}</strong></Text>
            </Col>

            <Col span={8}>
              <Text>Telefone</Text><br />
              <Text>
                {driver.phone}
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione incidentes
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie incidentes dos motoristas</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={() => setShowModal(true)}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar incidente
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <BarChart data={[]} />
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Table 
            columns={columns({ handleClickSelected })} 
            dataSource={[]} 
          />
        </Card>
      </Col>

      {
        showModal && (
          <IncidentForm
            handleCancel={setShowModal}
            visible={showModal}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
            handleSubmit={handleSubmit}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
          />
        )
      }

    </Row>
  )
}

export default Detail
