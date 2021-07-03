import { isEmpty } from 'ramda'

const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const formSettingsVehicle = [{
  label: 'Placa do veículo',
  name: 'plate',
  placeholder: '',
  rules: [
    {
      required: true,
      validator: async (_, value) => {
        let regex =  /^[a-zA-Z]{3}[0-9-a-zA-Z]{4}\b/
        if(isEmpty(value)) {
          return Promise.reject(new Error('Este campo é obrigatório!' ))
        }
        return (
          !regex.test(value) 
          && Promise.reject(new Error('Placa do veículo inválida!'))
        )
      }
    },
  ],
  show: true,
  typeInput: 'input'
},
{
  label: 'Frota',
  name: 'fleet',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Tipo de veículo',
  name: 'vehicleType',
  placeholder: '',
  rules,
  show: false,
  typeInput: 'select',
  options: [],
},
{
  label: 'Operação principal',
  name: 'mainOperation',
  placeholder: '',
  rules,
  show: false,
  typeInput: 'select',
  options: [],
},{
  label: 'Operação segundárias',
  name: 'secondaryOperations',
  placeholder: '',
  show: false,
  typeInput: 'select',
  mode: 'multiple',
  options: [],
}]

const parseOptionItem = ({ id, name }) => ({ value: id, label: name })

const formSettingsVehicleEdit = (
  fleetsSource,
  operationsSource,
  vehicleTypesSource,
) => formSettingsVehicle.map(item => {
  if (item.name === `vehicleType`) {
    return ({ ...item, show: true, options: vehicleTypesSource.map(parseOptionItem) })
  }

  if (item.name === `mainOperation` || item.name === `secondaryOperations`) {
    return ({ ...item, show: true, options: operationsSource.map(parseOptionItem) })
  }

  if (item.name === `fleet`) {
    return ({ ...item, show: true, options: fleetsSource.map(parseOptionItem) })
  }
  
  return ({...item, show: true })
})

const settingsNextStep = {
  plate: 'fleet',
  fleet: 'vehicleType',
  vehicleType: 'mainOperation',
  mainOperation: 'secondaryOperations',
}

export {
  settingsNextStep,
  formSettingsVehicle,
  formSettingsVehicleEdit
}
