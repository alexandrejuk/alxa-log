import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
import { map } from 'ramda'
import {
  settingsNextStep,
  formSettingsVehicle,
  formSettingsVehicleEdit
} from './formSettings'

const formItemsComponent = {
  input: Input,
  select: Select,
  textArea: Input.TextArea,
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

const MaintenanceForm = ({
  branchsSource,
  driversSource,
  vehiclesSource,
  handleCancel,
  visible,
  handleSubmit,
  handleEdit,
  maintenanceSelected,
  handleSelectedMaintenance
}) => {
  const [formSettings, setFormSettings] = useState(maintenanceSelected ? formSettingsVehicleEdit(branchsSource, driversSource, vehiclesSource) : formSettingsVehicle(vehiclesSource))
  const [form] = Form.useForm()
  const parseOptionItem = item => ({ value: item.id, label: item.name })
  const setOpetionValue = formItem => {
    switch (formItem.name) {
      case 'branch':
        return branchsSource.map(parseOptionItem)   
      case 'driver':
        return driversSource.map(parseOptionItem)
      default:
        return formItem.options
    }
  }

  const onValuesChangeVisableFomItem = value => {
    const formItem = formSettings.find(item => !item.show && settingsNextStep[Object.keys(value)[0]] === item.name)
    if (formItem) {
      setFormSettings(formSettings.map(item => (
        item.name === formItem.name 
          ? {...formItem, show: true, options: setOpetionValue(formItem) } 
          : item
      )))
    }
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      footer={[
        <Button key="back" onClick={() => {
          handleCancel(false)
          form.resetFields()
          setFormSettings(formSettingsVehicle)
          handleSelectedMaintenance(null)
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
      title={`${maintenanceSelected ? 'Editar' : 'Cadastrar'} nova manutenção`}
    >
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChangeVisableFomItem}
        validateTrigger="onChange"
        onFinish={values => {
          if (maintenanceSelected) {
            handleEdit({...maintenanceSelected, ...values})
          } else {
            handleSubmit(values)
          }
          handleSelectedMaintenance(null)
          setFormSettings(formSettingsVehicle)
          form.resetFields()
        }}
        initialValues={maintenanceSelected}
      >
        {map(renderFormItems, formSettings)}
      </Form>
    </Modal>
  )
}

export default MaintenanceForm
