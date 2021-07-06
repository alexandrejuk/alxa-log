const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsEvent = [
{
  label: 'Tipo de evento',
  name: 'event',
  rules,
  placeholder: '',
  show: true,
  typeInput: 'select',
  options: [
    {
      value: 'check-in',
      label: 'Entrada'
    },
    {
      value: 'avaiable',
      label: 'Liberado'
    },
    {
      value: 'parking',
      label: 'Estacionar'
    },
    {
      value: 'courtyard',
      label: 'Pátio'
    }, 
    {
      value: 'awaiting_repair',
      label: 'Aguardando peça'
    },
    {
      value: 'dock',
      label: 'Doca'
    },
    {
      value: 'wash',
      label: 'Lavar'
    },
    {
      value: 'supply',
      label: 'Abastecer'
    },
    {
      value: 'check-out',
      label: 'Saída'
    },
  ]
},
{
  label: 'Motorista',
  name: 'driver',
  placeholder: '',
  rules,
  show: false,
  typeInput: 'input',
  options: [],
},
  {
    label: 'Combustível',
    name: 'fuel',
    placeholder: '',
    rules,
    show: false,
    typeInput: 'select',
    options: [
      {
        value: 'diesel',
        label: 'Diesel'
      },
      {
        value: 'arla',
        label: 'Arla'
      }]
  }, 
  {
    label: 'Litros abastecido',
    name: 'totalLiters',
    placeholder: '',
    rules,
    show: false,
    typeInput: 'input',
    options: []
  },
  {
    label: 'KM',
    name: 'km',
    placeholder: '',
    rules,
    show: false,
    typeInput: 'input',
    options: []
  },
  {
    label: 'Hodometro',
    name: 'odometer',
    placeholder: '',
    rules,
    show: false,
    typeInput: 'input',
    options: []
  }
]

export default formSettingsEvent
