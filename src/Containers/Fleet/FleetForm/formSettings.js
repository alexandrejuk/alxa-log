const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsFleet = [{
  label: 'Identificação da frota',
  name: 'name',
  placeholder: '',
  rules,
  show: true,
  typeInput: 'input'
},
]

export default formSettingsFleet
