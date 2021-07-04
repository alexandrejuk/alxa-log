const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsDriver = [{
  label: 'Nome completo',
  name: 'name',
  placeholder: '',
  rules,
  show: true,
  typeInput: 'input'
},
{
  label: 'CNH',
  name: 'driverLicense',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},{
  label: 'Telefone',
  name: 'phoneDriver',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
]

const formSettingsDriverEdit = formSettingsDriver.map(item => ({...item, show: true }))

const settingsNextStep = {
  name: 'driverLicense',
  driverLicense: 'phoneDriver',
}

export {
  settingsNextStep,
  formSettingsDriver,
  formSettingsDriverEdit
}
