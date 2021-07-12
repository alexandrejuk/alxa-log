import React from 'react'
import {
  Row,
  Col,
  Image
} from 'antd'
// import PieChart from './PieChart'
import BarChart from './BarChart'
import OrdersSvg from './orders.svg'
import CustomersSvg from './customers.svg'
import EmptyStateOrderSvg from './empty-state-order.svg'
import EmptyStateCustomersSvg from './empty-state-customers.svg'
import styles from './style.module.css'
import CheckoutSvg from './checkout.svg'
import CheckoutEmptySvg from './checkout-empty.svg'

const Home = ({
  orderStatus,
}) => {
  const vehicleTotal = orderStatus
    .filter(({ status }) => status !== 'check-out')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalAvailable = orderStatus
    .filter(({ status }) => status === 'check-out')
    .reduce((acc, prev) => acc + Number(prev.count), 0)
  
  const vehicleTotalSolicitacion = orderStatus
    .filter(({ status }) => status === 'solicitation')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1 className={styles.welcomeTitle}>Bem-vindo</h1>
        <p className={styles.welcomeSubtitle}>Ao <b>alxa dashboard</b> para suas análises</p>
      </Col>     

      <Col span={8}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de solicitações</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalSolicitacion > 0 ? vehicleTotalSolicitacion :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalSolicitacion > 0 ? CustomersSvg : EmptyStateCustomersSvg} alt="orders" />
        </div>
      </Col>

      <Col span={8}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de concluídos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalAvailable > 0 ? vehicleTotalAvailable :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalAvailable > 0 ? CheckoutSvg : CheckoutEmptySvg} alt="orders" />
        </div>
      </Col>

      <Col span={8}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de veículos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotal > 0 ? vehicleTotal :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotal > 0 ? OrdersSvg : EmptyStateOrderSvg} alt="orders" />
        </div>
      </Col>

      <>
        <Col span={24}>
          <div className={styles.cardBarChart}>
            <BarChart data={orderStatus} />
          </div>
        </Col>
        {/* <Col span={8}>
          <div className={styles.cardPieChart}>
            <PieChart data={orderCompanyStatus} />
          </div>
        </Col> */}
      </>
      {/* <Col span={24}>
        <div className={styles.cardEmptyState}>
          <div className={styles.cardEmptyStateInfo}>
            <h1 className={styles.cardEmptyStateTitle}>Não encontramos nenhuma
              <span className={styles.cardEmptyStateTitleSpan}> manutenção</span>!
            </h1>
            <p className={styles.cardEmptyStateSubtitle}>Você ainda não possue nenhuma manutenção para calcularmos as suas métricas.</p>
            <p className={styles.cardEmptyStateSubtitle}>Cadastre uma <b>manutenção</b>, e comece a utilizar o <b>alxa</b>!</p>
          </div>
          <Image src={EmptyStateSvg} preview={false} alt="empty state" />
        </div>
      </Col>
    ) */}
    </Row>
  )
}

export default Home
