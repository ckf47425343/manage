import React, { Component } from 'react'
import '../assets/css/public.css'
import '../assets/css/inputItem.css'


export default class InputItem extends Component {
   constructor(){
       super()
       this.state={
           OptionDefault:{
               inputIcon:'',
               openIcon:'',
               closeIcon:'',
                
               
               
           }
        
       }
   }
    
    render() {
        return (
            <div className="input-item clearfix">
                <div className="input-icon fl">
                  <i className="fa fa-address-book  "></i>
                </div>
                <div className="input-area fl">
                 <input  ></input>
                </div>
                <div className="type-icon fr">
                <i className="fa fa-address-book "></i>
                </div>
              
            </div>
        )
    }
}
