import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import FleetForm from '../FleetForm'
import FleetList from './FleetList'

const { Title } = Typography

const Manager = ({
  handleSelectedFleet,
  fleetSelected,
  loading,
  source,
  handleSubmit,
  handleEdit,
  handleFilter,
  searchValue,
  handleFilterOnchange,
  clearFilter,
  onChangeTable,
  total,
  page
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditFleet = (value) => {
    handleSelectedFleet(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novas frotas
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie as frotas</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar frota
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
  
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre pela código de indentificação da frota."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleFilterOnchange}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} onClick={clearFilter}>
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleFilter}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      
      <Col span={24}>
        <Card bordered={false}>
          <FleetList 
            // onChangeTable={onChangeTable} 
            datasource={source} 
            // total={total}
            handleClickEdit={showModalEditFleet}
            loading={loading}
            // page={page}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <FleetForm
            handleCancel={setShowModal}
            visible={showModal}
            handleSubmit={handleSubmit}
            fleetSelected={fleetSelected}
            handleSelectedFleet={handleSelectedFleet}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
