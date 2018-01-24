import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Landing from '../components/Landing'

export default () => {
  return (
    <div>
      <BrowserRouter>
        <div>
         <Header/>
         <Route exact path="/" component={Landing} />
         <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  )
}
