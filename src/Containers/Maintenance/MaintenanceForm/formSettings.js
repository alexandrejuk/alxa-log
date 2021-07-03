import { isEmpty } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsVehicle = vehiclesSource => [{
  label: 'Placa do Cavalo',
  name: 'plateHorse',
  placeholder: '',
  show: true,
  typeInput: 'select',
  options: vehiclesSource.filter(item => item.vehicleType === 'horse').map(item => ({ value: item.id, label: item.plate }))
},
{
  label: 'Placa da Carreta',
  name: 'plateCart',
  placeholder: '',
  show: true,
  typeInput: 'select',
  options: vehiclesSource.filter(item => item.vehicleType === 'cart').map(item => ({ value: item.id, label: item.plate }))
},
{
  label: 'Motorista',
  name: 'driver',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Data da manutenção',
  name: 'maintenanceDate',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
{
  label: 'Filial',
  name: 'branch',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Criticidade',
  name: 'priority',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: [{ value: 'low', label: 'Baixa' }, { value: 'medium', label: 'Média' }, { value: 'high',  label: 'Alta' }]
},
{
  label: 'Tipo de Serviço',
  name: 'service',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: [{ value: 'corrective', label: 'Corretiva' }, { value: 'preventive', label: 'Preventiva' }]
},
{
  label: 'Descrição do serviço',
  name: 'serviceDescription',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'textArea',
  options: []
},
]

const parseOptionItem = ({ id, name }) => ({ value: id, label: name })

const formSettingsVehicleEdit = (
  branchsSource, 
  driversSource,
  vehiclesSource
) => formSettingsVehicle(vehiclesSource).map(item => {
  if (item.name === `vehicleType`) {
    return ({ ...item, show: true, options: vehicleTypesSource.map(parseOptionItem) })
  }

  if (item.name === `branch`) {
    return ({ ...item, show: true, options: branchsSource.map(parseOptionItem) })
  }

  if (item.name === `driver`) {
    return ({ ...item, show: true, options: driversSource.map(parseOptionItem) })
  }
  
  return ({...item, show: true })
})

const settingsNextStep = {
  plateHorse: 'driver',
  plateCart: 'driver',
  driver: 'maintenanceDate',
  maintenanceDate: 'branch',
  branch: 'priority',
  priority: 'service',
  service: 'serviceDescription',
}

export {
  settingsNextStep,
  formSettingsVehicle,
  formSettingsVehicleEdit
}
