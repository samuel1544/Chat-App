import React from 'react'
import './Slidebar.css'
import SideBarButton from './SideBarNavLinks'
import Logo from './Logo'

function slidebar() {
  return (
    <div className='sideBarWrapper'>
        <div className="sideBarBody">
            <Logo/>
            <div className="unorderList">
                {makeButtons.map((btn,i)=>(
                    <SideBarButton to={btn.to} icon={btn.icon} title={btn.title}/> 
                ))}
            </div>
        </div>  
    </div>
  )
}

const makeButtons=[
    {
        to:"/dashboard/home",
        icon: <i className='fa-solid fa-house'></i>,
        title:"Dashboard"
    },
    {
        to:"/dashboard/profile",
        icon: <i className='fa-solid fa-id-card'></i>,
        title:"Profile",
        subbtn: ["Password","mail","Accounts"]
    },

]
    

export default slidebar
