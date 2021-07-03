import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography, Form } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import VehicleForm from '../VehicleForm'
import VehicleList from './VehicleList'

const { Title } = Typography

const Manager = ({
  loading,
  source,
  operationsSource,
  fleetsSource,
  vehicleTypesSource,
  handleSubmit,
  handleSelectedVehicle,
  vehicleSelected,
  handleEdit,
  onChangeTable,
  total,
  page
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditVehicle = (value) => {
    handleSelectedVehicle(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novos veículos
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie os seus veículos</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar veículos
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
  
      {/* <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre por nome ou documento."
                prefix={<SearchOutlined />}
                value={filters.search_name_or_document}
                onChange={onChangeSearch}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} onClick={clearFilters}>
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleFilter}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
       */}
      <Col span={24}>
        <Card bordered={false}>
          <VehicleList 
            // onChangeTable={onChangeTable} 
            datasource={source} 
            // total={total}
            handleClickEdit={showModalEditVehicle}
            loading={loading}
            // page={page}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <VehicleForm
            handleCancel={setShowModal}
            visible={showModal}
            operationsSource={operationsSource}
            fleetsSource={fleetsSource}
            vehicleTypesSource={vehicleTypesSource}
            handleSubmit={handleSubmit}
            vehicleSelected={vehicleSelected}
            handleSelectedVehicle={handleSelectedVehicle}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
