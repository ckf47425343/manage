import React, { Component } from 'react'
import '../assets/css/login.css'
import InputItem from '../components/InputItem.js'

export default class Login extends Component {
    render() {
        return (
            <div className="login">
              <InputItem/>
            </div>
        )
    }
}
