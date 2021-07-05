import React, { useState } from 'react'
import { Button, Form, Input, Select, Typography, Row, Col } from 'antd'
import { map } from 'ramda'
import ModalMobile from '../../../Components/ModalMobile'
import formSettingsEvent from './formSettings' 
import { CloseOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const formItemsComponent = {
  input: Input,
  select: Select
}

const renderFormItems = ({ 
  label, 
  name, 
  rules, 
  placeholder, 
  show, 
  typeInput, 
  options = [], 
  mode = null 
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        <Component 
          showSearch
          name={name} 
          placeholder={placeholder} 
          options={options} 
          mode={mode} 
          filterOption={(value, option) => (
            option.label.toLowerCase().indexOf(value.toLowerCase()) >= 0
          )}
        />
      </Form.Item>
    )
  )
}

const checkout = {
  'event': 'driver',
}

const supply = {
  event: 'driver',
  driver: 'supplyType',
  supplyType: 'totalLiters',
  totalLiters:'km',
  km: 'odometer',
}

const formSettingsNextStep = {
  'check-in': {},
  'check-out': checkout,
  'courtyard': {},
  'awaiting_repair': {},
  'dock': {},
  'wash': {},
  supply,
}

const MaintenanceEventForm = ({
  show,
  cancel,
  handleSubmit,
}) => {
  const [formSettings, setFormSettings] = useState(formSettingsEvent)
  const [nextStepForm, setNextStepForm] = useState({})

  const [form] = Form.useForm()

  const onValuesChangeVisableFomItem = value => {
    const propName = Object.keys(value)[0]
    let nextStep = nextStepForm

    if (propName === 'event') {
      nextStep = formSettingsNextStep[value[propName]]
      setNextStepForm(nextStep)

      if (value[propName] === 'check-out') {
        form.setFieldsValue({
          event: value[propName],
          driver: '',
          supplyType: '',
          totalLiters:'',
          km: '',
        })
        
        setFormSettings(formSettings.map(item => (
          item.name === propName || item.name === 'driver'
          ? {...item, show: true } 
          : {...item, show: false }
          )))
        }

      if (value[propName] !== 'check-out' && value[propName] !== 'supply') {
        form.setFieldsValue({
          event: value[propName],
          driver: '',
          supplyType: '',
          totalLiters:'',
          km: '',
        })
        
        setFormSettings(formSettings.map(item => (
          item.name === propName
          ? {...item, show: true } 
          : {...item, show: false }
          )))
        }
      }
      
      const formItem = formSettings.find(item => !item.show && nextStep[propName] === item.name)

    if (formItem) {
      setFormSettings(formSettings.map(item => (
        item.name === formItem.name 
          ? {...formItem, show: true } 
          : item
      )))
    }
  }

  return (
    <ModalMobile show={show}>
        <Row>
          <Col span={24} style={{ textAlign: "right"}}>
            <Button type="link" style={{ color: "#333" }} onClick={() => {
              cancel()
              form.resetFields()
            }}><CloseOutlined /></Button>
          </Col>
          <Col span={24}>
            <Title level={5}>Adicione um evento!</Title>
            <p style={{ fontSize: '0.9em' }}>
              Todos as atividades são criadas com a situação <strong>“Aberto”</strong>, 
              mas vocês podem alterar por uma das opções abaixo:
            </p>
          </Col>
          <Col span={24}>
            <Form
              form={form}
              onValuesChange={onValuesChangeVisableFomItem}
              validateTrigger="onChange"
              layout="vertical"
              onFinish={handleSubmit}
            >
              {map(renderFormItems, formSettings)}
              <Form.Item>
                <Button type="primary" htmlType="submit" block>Salvar</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </ModalMobile>
  )
}

export default MaintenanceEventForm
