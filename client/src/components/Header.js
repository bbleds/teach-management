import React, {Component} from 'react'

export default class Header extends Component{

  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">App</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
               <a>Sign in with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
