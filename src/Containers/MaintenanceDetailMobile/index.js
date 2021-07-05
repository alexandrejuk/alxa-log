import React, { useState } from 'react'
import { Button, Row, Col, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import MaintenanceEventForm from './MaintenanceEventForm'

const { Title, Text } = Typography 

const MaintenanceDetailMobile = ({
  goBack,
  handleSubmit
}) => {
  const [showModal, setShowModal] = useState(false)

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
                <Text style={{ color: "#FFFFFF" }}><strong>ABC1234</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>ABC1234</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>Preventiva</strong></Text>
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
                <Text style={{ color: "#FFFFFF" }}><strong>2h30</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>Check-in</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>Alta</strong></Text>
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
                <Text><strong>Alexandre Soares</strong></Text>
              </Col>
              <Col span={12} style={{ padding: "10px 0 0 0"}}>
                <Text>CNH</Text>
              </Col>
              <Col span={12} style={{ padding: "10px 0 0 0"}}>
                <Text>Telefone</Text>
              </Col>
              <Col span={12}>
                <Text><strong>8976554432</strong></Text>
              </Col>
              <Col span={12}>
                <Text><strong>11 9 6503-5205</strong></Text>
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
                  Leia o qrcode, de autorização do veículo posicione a câmera sobre 
                  o QR code e aguarde ou pesquise o veículo pela placa ou frota!
                </Text>
              </Col>
            </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Row>
            <Col span={24}>
              <Title level={5}>Eventos</Title>
            </Col>
            <Col span={24}></Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Button block type="primary" onClick={() => setShowModal(true)}>Adicionar eventos</Button>
        </Col>
      </Row>
      {showModal && ( 
        <MaintenanceEventForm 
          show={showModal} 
          cancel={() => setShowModal(false)}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default MaintenanceDetailMobile
