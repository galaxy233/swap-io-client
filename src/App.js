import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Layout } from './components';

import './style.css'

const App = () => (
  <BrowserRouter>
    <Route path="/" component={ Layout }/>
  </BrowserRouter>
)

export default App;
