const rules = [{ required: true, message: 'Este campo é obrigatório!' }]
const parseOptionItem = ({ id, name }) => ({ value: id, label: name })

const formSettingsBranch = [
{
  label: 'Operação',
  name: 'name',
  placeholder: '',
  show: true,
  rules,
  typeInput: 'input',
  options: []
},
{
  label: 'Unidade',
  name: 'branch',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'select',
  options: []
},
{
  label: 'Vagas',
  name: 'vacancy',
  rules,
  placeholder: '',
  show: false,
  typeInput: 'input',
  options: []
},
]
const formSettingsBranchEdit = (
  branchsSource, 
) => formSettingsBranch.map(item => {
  if (item.name === `branch`) {
    return ({ ...item, show: true, options: branchsSource.map(parseOptionItem) })
  }
  
  return ({...item, show: true })
})

const settingsNextStep = {
  name: 'branch',
  branch: 'vacancy',
}

export {
  settingsNextStep,
  formSettingsBranch,
  formSettingsBranchEdit
}
