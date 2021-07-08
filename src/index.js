import React from 'react'
import ReactDOM from 'react-dom'
import ptBR from 'antd/lib/locale/pt_BR'
import { ConfigProvider } from 'antd'
import { HashRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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

serviceWorkerRegistration.register()
reportWebVitals()
