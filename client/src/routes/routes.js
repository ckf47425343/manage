import {Route} from 'react-router-dom'


export const  routeList=(routes)=>{
     console.log("routes=>",routes)
   return  routes.map(route=>{
     return  <Route  key={route.name} path={route.path} render={props=>{return <route.component {...props}/>} }  />
   })


}