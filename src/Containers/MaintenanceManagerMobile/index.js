import React, { useState } from 'react'
import { Button, Image, Row, Col, Input } from 'antd'
import QrReader from 'react-qr-reader'
import QrCode from './qrcode.png'

const MaintenanceManagerMobile = () => {

  const [qrcodeResult, setQrcodeResult] = useState(null)
  const [searchVehicle, setSearchVehicle] = useState('')
  const [searchButton, setSearchButton] = useState(true)

  const handleScan = data => {
    if (data) {
      setQrcodeResult(data)
    }
  }

  const handleChange = data => {
    setSearchVehicle(data.target.value)
    if(data.target.value.length === 0) {
      return setSearchButton(true)
    }
    return setSearchButton(false)
  }

  const handleClick = () => {
    console.log(searchVehicle, qrcodeResult)
  }


  const handleError = err => {
    console.log(err)
  }

  return (
    <div style={{ overflow: "hidden"}}>
      <Row>
        <Col span={24}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Row align="center" gutter={[16, 16]} style={{ padding: "24px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Image src={QrCode} width={50} height={50} />
        </Col>
        <Col span={24} style={{ textAlign: "center" }} >
          <p>
            Leia o qrcode, de autorização do veículo posicione a câmera sobre o
            QR code e aguarde ou pesquise o veículo pela placa ou frota!
          </p>
        </Col>
        <Col span={24}>
          <Input 
            value={searchVehicle} 
            placeholder="Pesquise pela placa ou frota." 
            onChange={handleChange}
          />
        </Col>
        <Col span={24}>
          <Button 
            type="primary" 
            block 
            disabled={searchButton}
            onClick={handleClick}
          >
            Pesquisar
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default MaintenanceManagerMobile
