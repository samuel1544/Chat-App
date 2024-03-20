 import React from 'react'
 import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
 
export const NavLinks = styled(NavLink)`
position: relative;
    color: #fff;
    padding: 15px 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 2px 10px;
    border-radius: 10px;

    &:hover{
        background-color: #ffffff24;
    }
    &.active{
        background: #fff;
        color: #4297ff;
        transition: all 0.4s ease;
    }
`;

const Icon = styled.div`
margin-right: 14px;
font-size: 20px;
`

 function SideBarButton({to, icon, title}) {
   return (
    <li>
        <NavLinks
        strict="true"
        to={{
            pathname: to
        }}
       >
        <Icon>{icon}</Icon>
        {title}
      </NavLinks>
      {/* <div className="NavLinks" strict="true"
        to={{
            pathname: to
        }}
       >
        <div className="Icon">{icon}</div>
        {title}
      </div> */}
    </li>
   )
 }


 
 export default SideBarButton
 