import React from 'react'
import styles from './style.module.css'
import Qrcode  from 'qrcode.react'
import formattedDate from '../../utils/parserDate'

const Voucher = ({
  maintenanceSelected
}) => {
  const {
    serviceDescription = null,
    driverMain = null,
    id = null,
    maintenanceDate = null,
    plateCart = null,
    plateHorse = null,
    priority = null,
    service = null,
    company = {}
  } = maintenanceSelected
  const {
    street = null,
    streetNumber = null,
    neighborhood = null,
    state = null,
    city = null,
    zipcode = null
  } = company

  return (
    <div className={styles.cardticket}>

      <div className={styles.cardheader}>
        <h3>Voucher de manutenção</h3>
      </div>

      <div className={styles.rip}>
        <div className={styles.linesolid} />
      </div>

      <div className={styles.cardheader}>
        <p>Nome <strong>{driverMain}</strong></p>
        <p>Placa Cavalo <strong>{plateHorse}</strong></p>
        <p>Placa Carreta <strong>{plateCart}</strong></p>
        <p>Prioridade <strong>{priority}</strong></p>
        <p>Data da manutenção <strong>{formattedDate(maintenanceDate, 'DD/MM/YYYY')}</strong></p>
        <p>Tipo Serviço <strong>{service}</strong></p>
      </div>

      <div className={styles.cardfooterbarcode}>
        <p>O qrcode da sua manuntenção é</p>
        <Qrcode value={id} />
      </div>

    
      <div className={styles.cardcontent}>
        <h3>Descrição do serviço</h3>
        <p className={styles.cardcontentmessage}>
          {serviceDescription}
        </p>
      </div>

      <div className={styles.cardfooter}>
        <h3>Compareça à filial</h3>
        <div className={styles.cardfooterimage}></div>
        <p>{street}, {streetNumber} {neighborhood} - {city}/{state} - {zipcode}</p>
      </div>

      <div className={styles.rip}>
        <div className={styles.linedash}></div>
      </div>

      <div className={styles.cardfooterbarcode}>
        <h6>
          Para garantir que essa manutenção sejá cumprida você tem até 24h para 
          responder a solicitação dos operadores de tráfego.
        </h6>
      </div>

      <div className={styles.contentfootermain}>
        <h6>Você pode apresentar o voucher pelo celular ou impresso</h6>
      </div>
    </div>
  )
}

export default Voucher
