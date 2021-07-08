import React from 'react'
import { Button, Row, Col, Typography, Divider } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import MaintenanceEventForm from './MaintenanceEventForm'
import diffTime from '../../utils/permananceTime'
import formattedDate from '../../utils/parserDate'

const { Title, Text } = Typography 
const status = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

const services = {
  corrective: 'Corretiva',
  preventive: 'Preventiva'
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
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && services[maintenanceOrder.service]}</strong></Text>
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
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && parseStatus[maintenanceOrder.status]}</strong></Text>
              </Col>
              <Col span={8}>
                <Text style={{ color: "#FFFFFF" }}><strong>{maintenanceOrder && status[maintenanceOrder.priority]}</strong></Text>
              </Col>
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
            <Row>
              <Col span={24}>
                <Divider orientation="left"><strong>Dados do condutor da entrada {!maintenanceOrder.driverSecondary && maintenanceOrder.status === 'check-out' ? 'saída' : ''}</strong></Divider>
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
        { maintenanceOrder && maintenanceOrder.driverSecondary && (
          <Col span={24} style={{ padding: "16px"}}>
              <Row>
                <Col span={24}>
                  <Divider orientation="left"><strong>Dados do condutor da saída</strong></Divider>
                </Col>
                <Col span={24}>
                  <Text>Nome</Text>
                </Col>
                <Col span={24}>
                  <Text><strong>{maintenanceOrder && maintenanceOrder.driverSecondary}</strong></Text>
                </Col>
                <Col span={12} style={{ padding: "10px 0 0 0"}}>
                  <Text>Cnh</Text>
                </Col>
                <Col span={12} style={{ padding: "10px 0 0 0"}}>
                  <Text>Telefone</Text>
                </Col>
                <Col span={12}>
                  <Text><strong>{maintenanceOrder && maintenanceOrder.driverSecondaryLicense}</strong></Text>
                </Col>
                <Col span={12}>
                  <Text><strong>{maintenanceOrder && maintenanceOrder.driverPhoneSecondary}</strong></Text>
                </Col>
              </Row>
          </Col>
        )}
        <Col span={24} style={{ padding: "16px"}}>
            <Row>
              <Col span={24}>
                <Divider><strong>Descrição do serviço</strong></Divider>
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
              <Divider orientation="left"><strong>Abastecimentos</strong></Divider>
            </Col>
            <Col span={24}>
              <h5>Estamos salvando precisamos adicionar na tela!</h5>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "16px"}}>
          <Row>
            <Col span={24}>
              <Divider orientation="left"><strong>Eventos</strong></Divider>
            </Col>
            <Col span={24}>
              <Row gutter={[8, 8]}>
                {maintenanceOrder && maintenanceOrder.maintenanceOrderEvents.map(({
                  createdAt,
                  id,
                  status,
                })=> (
                  <Col span={8} key={id}>
                    <Text>{parseStatus[status]}</Text>< br />
                    <Text><strong>{maintenanceOrder && formattedDate(createdAt, "DD MMM")}</strong></Text>
                  </Col>
                ))}
              </Row>
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
