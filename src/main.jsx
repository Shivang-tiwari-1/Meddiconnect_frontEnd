import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import Store from './Redux/Store/Store.tsx';
import WrappedApp from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <Provider store={Store}>
        <WrappedApp />
      </Provider>
   

  </React.StrictMode>,
)
