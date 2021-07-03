import React from 'react'
import {
  Row,
  Col,
  Image
} from 'antd'
import PieChart from './PieChart'
import BarChart from './BarChart'
import OrdersSvg from './orders.svg'
import CustomersSvg from './customers.svg'
import PersonAd from './personAd.png'
import EmptyStateSvg from './empty-state.svg'
import EmptyStateOrderSvg from './empty-state-order.svg'
import EmptyStateCustomersSvg from './empty-state-customers.svg'
import styles from './style.module.css'

const Home = ({
  dataBarChart,
  dataPieChart,
  customers,
  orders,
}) => {
  return (
    <Row gutter={[18, 18]}>
      <Col span={24}>
        <h1 className={styles.welcomeTitle}>Bem-vindo</h1>
        <p className={styles.welcomeSubtitle}>Ao <b>alxa dashboard</b> para suas análises</p>
      </Col>
      <Col span={12}>
        <div className={styles.cardPremiumAd}>
          <div>
            <h2 className={styles.cardPremiumTitle}>HOME PREMIUM</h2>
            <p className={styles.cardPremiumSubtitle}>Aguarde em breve no <b>alxa</b>, nova <b>Home Premium</b>,  mais controle e métricas.</p>
          </div>
          <Image src={PersonAd} alt="person ad" preview={false} />
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de Veículos</h1>
            <h1 className={styles.cardTotalValue}>{orders && orders.value ? orders.value : '-' }</h1>
          </div>
          <Image preview={false} src={orders && orders.value > 0 ? OrdersSvg : EmptyStateOrderSvg} alt="orders" />
        </div>
      </Col>
      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de Motoristas</h1>
            <h1 className={styles.cardTotalValue}>{customers && customers.value > 0 ? customers.value : '-' }</h1>
          </div>
          <Image src={customers && customers.value > 0 ? CustomersSvg : EmptyStateCustomersSvg } preview={false} alt="customers" />
        </div>
      </Col>
      {
        dataBarChart.length > 0 ? (
          <>
            <Col span={18}>
              <div className={styles.cardBarChart}>
                <BarChart data={dataBarChart} />
              </div>
            </Col>
            <Col span={6}>
              <div className={styles.cardPieChart}>
                <PieChart data={dataPieChart} />
              </div>
            </Col>
          </>
          )
        : (
          <Col span={24}>
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
        )
      }
    </Row>
  )
}

export default Home
