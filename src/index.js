import React from 'react'
import ReactDOM from 'react-dom'
import ptBR from 'antd/lib/locale/pt_BR'
import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider locale={ptBR}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.register()
reportWebVitals()
