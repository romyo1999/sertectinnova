import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {UserProvider} from './providers/UserProvider.jsx'
import { SettingProvider } from './providers/GeneralSettingProvider.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <SettingProvider>
        <UserProvider>
          <App/>
        </UserProvider>

      </SettingProvider>
  </React.StrictMode>
,
)
