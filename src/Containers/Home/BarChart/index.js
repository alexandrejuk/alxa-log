import React from 'react'
import { Row, Col, Typography, Tag } from 'antd'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import formattedDate from '../../../utils/parserDate'

const { Title } = Typography

const chartSettings = [
  { label: 'solicitation', value: 'Solicitação', color: '#5DA0FC',},
  { label: 'check-in', value: 'Entrada', color: '#268E86',},
  { label: 'avaiable', value: 'Liberado', color: '#F29F03',},
  { label: 'parking', value: 'Estacionar', color: '#1772C9',},
  { label: 'courtyard', value: 'Pátio', color: '#EA5656',},
  { label: 'awaiting_repair', value: 'Aguardando peça', color: '#7550D8',},
  { label: 'dock', value: 'Doca', color: '#2D2D2D',},
  { label: 'wash', value: 'Lavar', color: '#D588F2',},
  { label: 'supply', value: 'Abastecer', color: '#17C9B2',},
  { label: 'check-out', value: 'Saída', color: '#264ABE',},
]

const Chart = ({ data }) => (
  <Row gutter={[0, 16]}>
    <Col span={24}>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data.map(({ name, count, status }) => ({ name, [status]: count }))}
          height={380}
          margin={{ left: 15 }}
          maxBarSize={13}>
          <XAxis
            axisLine={false}
            dataKey="name"
            tick={{ fontSize: 13 }}
            tickFormatter={(value) => formattedDate(value, 'DD/MM/YYYY')}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            height={50}
            label={
              <text
                fontSize="13"
                textAnchor="end"
                transform="rotate(270, 13, 143)"
                x="120"
                y="140">
                <tspan>
                  Os totais estão por quantidade de veículos em cada status!
                </tspan>
              </text>
            }
            tick={{ fontSize: 13 }}
          />
          <CartesianGrid stroke="#d7d7d7" vertical={false} />
          <Tooltip
            cursor={{ fillOpacity: 0.3 }}
            labelFormatter={(value) => formattedDate(value, 'DD/MM/YYYY')}
          />
          {chartSettings.map(({ label, color, value }) => (
            <Bar
              dataKey={label}
              fill={color}
              key={label}
              name={value}
              stackId="a"
              stroke={color}
              type="monotone"
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Col>
    <Row style={{ marginTop: '20px' }} gutter={[8, 8]} wrap={true}>
      <Col span={24}>
        <Title level={5}>LEGENDAS</Title>
      </Col>
      {chartSettings.sort((a, b) => b - a).map(({ color, value, label }) => (
        <Col key={`${color}-${value}`} xs={6} sm={6} md={6} lg={6} xl={6}>
          <Tag color={color}>{value}</Tag>
        </Col>
      ))}
    </Row>
  </Row>
)

export default Chart
