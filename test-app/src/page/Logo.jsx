import React from 'react'
import {Link} from 'react-router-dom'

function Logo() {
  return (
    <div className="LogoWrapper">
        <Link to="dashboard/home">
            <div>
                <i className="fa-brands fa-react"></i>
                <h4>Mr. Charles</h4>
            </div>
        </Link>
    </div>
  )
}

export default Logo
