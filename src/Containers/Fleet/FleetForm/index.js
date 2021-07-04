import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import formSettingsFleet from './formSettings'

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
}) => {
  const Component = formItemsComponent[typeInput]
  return (
    show && (
      <Form.Item key={name} label={label} name={name} rules={rules}>
        <Component 
          showSearch
          name={name} 
          placeholder={placeholder}
        />
      </Form.Item>
    )
  )
}

const DriverForm = ({
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  fleetSelected,
  handleSelectedFleet
}) => {
  const [formSettings, setFormSettings] = useState(formSettingsFleet)
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={() => {
          handleCancel(false)
          form.resetFields()
          setFormSettings(formSettingsFleet)
          handleSelectedFleet(null)
        }}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          onClick={() => form.submit()}
          type="primary">
          Salvar
        </Button>
      ]}
      title={`${fleetSelected ? 'Editar' : 'Cadastrar'} frota`}
    >
      <Form
        form={form}
        layout="vertical"
        validateTrigger="onChange"
        onFinish={values => {
          if (fleetSelected) {
            handleEdit({...fleetSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedFleet(null)
          setFormSettings(formSettingsFleet)
          form.resetFields()
        }}
        initialValues={fleetSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default DriverForm
