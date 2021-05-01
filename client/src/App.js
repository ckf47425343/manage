import React,{Component}  from 'react'

import {Switch} from  'react-router-dom'

import {routes} from './routes/index.js'

import {routeList} from './routes/routes.js'

import './assets/css/App.css'




export default class App extends Component{
     
    render(){

        return <div className="app">
        
        <Switch>
        
          {routeList(routes)}
     
        </Switch>
      
        </div>
             
    }


}
