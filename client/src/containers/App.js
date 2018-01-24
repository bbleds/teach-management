import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BrowserRouter, Route} from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Landing from '../components/Landing'
import actions from '../actions'


class App extends Component {

  componentDidMount(){
    this.props.actions.fetchUser()
  }

  render(){
    const { user } = this.props
    let name = user ? user.firstName : 'Unknown'

    return (
      <div className="container">
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
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
