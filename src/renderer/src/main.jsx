import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.min.css';                   // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { HashRouter } from 'react-router-dom';
import { SearchProvider } from './contexts/search';
import { DataProvider } from './contexts/data';

ReactDOM.createRoot(document.getElementById('root')).render(  
  <HashRouter>
    <DataProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </DataProvider>
  </HashRouter>
)
