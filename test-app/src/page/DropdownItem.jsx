import React from 'react'

function DropdownItem(props){
    return (
        <li className='dropdownitem'>
            <button className='LogOut'>{props.text}</button>
        </li>
    )
}

export default DropdownItem