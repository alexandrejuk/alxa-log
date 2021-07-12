import React, { useState } from 'react'
import { message, Form } from 'antd'
import { withRouter } from 'react-router-dom'
import UpdateMyPasswordContainer from '../../Containers/UpdateMyPassword'
import { updateUserPassword as updateUserPasswordService } from '../../Services/User'

const UpdateMyPassword = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    setLoading(true)

    try {
      await updateUserPasswordService(values)
      setLoading(false)
      message.success('Sua senha foi alterada com sucesso!')
      form.resetFields()
    } catch (error) {
      // isso é temporário
      message.error(
        'Não foi possível atualizar senha! Verifique os dados que estão sendo passados'
      )
      setLoading(false)
    }
  }

  const goToOrder = () => history.push('/logged/dashboard')

  return (
    <UpdateMyPasswordContainer
      goToOrder={goToOrder}
      handleSubmit={handleSubmit}
      loading={loading}
      form={form}
    />
  )
}

export default withRouter(UpdateMyPassword)
