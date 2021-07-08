import React from 'react'
import { Button, Row, Col, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import MaintenanceEventForm from './MaintenanceEventForm'
import diffTime from '../../utils/permananceTime'

const { Title, Text } = Typography 

const MaintenanceDetailMobile = ({
  goBack,
  handleSubmit,
  maintenanceOrder,
  driversSource,
  showModal,
  setShowModal,
}) => {
  return (
    <div style={{ overflow: "hidden"}}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row style={{ background: "#1890FF", color: "#FFFFFF" }}>
            <Col span={24} style={{ padding: "16px 0" }}>
              <Button type="link" style={{ color: "#FFFF" }} onClick={goBack}>
                <LeftOutlined />
              </Button>
            </Col>
            <Row style={{ padding: "0 16px 16px"}}>
              <Col span={24}>
                <Title style={{ color: "#FFFFFF" }} level={5}>Detalhes</Title>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}>Placa cavalo</Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}>Placa carreta</Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}>Tipo serviço</Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && maintenanceOrder.plateHorser}</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && maintenanceOrder.plateCart}</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && maintenanceOrder.service}</strong></Text>
              </Col>
              <Col span={8} style={{ padding: "10px 0 0 0"}}>
                <Text style={{ color: "#FFFFFF" }}>Permanência</Text>
              </Col>
              <Col span={8} style={{ padding: "10px 0 0 0"}}>
                <Text style={{ color: "#FFFFFF" }}>Status</Text>
              </Col>
              <Col span={8} style={{ padding: "10px 0 0 0"}}>
                <Text style={{ color: "#FFFFFF" }}>Prioridade</Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && diffTime(maintenanceOrder.createdAt, maintenanceOrder.updatedAt, maintenanceOrder.status)}</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && maintenanceOrder.status}</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && maintenanceOrder.priority}</strong></Text>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
            <Row>
              <Col span={24}>
                <Title level={5}>Dados do condutor</Title>
              </Col>
              <Col span={24}>
                <Text>Nome</Text>
              </Col>
              <Col span={24}>
                <Text><strong>{maintenanceOrder && maintenanceOrder.driverMain}</strong></Text>
              </Col>
              <Col span={12} style={{ padding: "10px 0 0 0"}}>
                <Text>Cnh</Text>
              </Col>
              <Col span={12} style={{ padding: "10px 0 0 0"}}>
                <Text>Telefone</Text>
              </Col>
              <Col span={12}>
                <Text><strong>{maintenanceOrder && maintenanceOrder.driverMainLicense}</strong></Text>
              </Col>
              <Col span={12}>
                <Text><strong>{maintenanceOrder && maintenanceOrder.driverMainPhone}</strong></Text>
              </Col>
            </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
            <Row>
              <Col span={24}>
                <Title level={5}>Descrição do serviço</Title>
              </Col>
              <Col span={24}>
                <Text>
                  {maintenanceOrder && maintenanceOrder.serviceDescription}
                </Text>
              </Col>
            </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Row>
            <Col span={24}>
              <Title level={5}>Abastecimentos</Title>
            </Col>
            <Col span={24}>
              <h5>Estamos salvando precisamos adicionar na tela!</h5>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Row>
            <Col span={24}>
              <Title level={5}>Eventos</Title>
            </Col>
            <Col span={24}>
              <h5>Estamos salvando precisamos adicionar na tela!</h5>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Button block type="primary"  size="large" onClick={() => setShowModal(true)}>Adicionar eventos</Button>
        </Col>
      </Row>
      {showModal && ( 
        <MaintenanceEventForm 
          show={showModal} 
          cancel={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          driversSource={driversSource}
        />
      )}
    </div>
  )
}

export default MaintenanceDetailMobile
