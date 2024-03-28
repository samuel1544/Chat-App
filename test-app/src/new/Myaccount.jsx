import React from 'react'
import  './Myaccount.css'

function Myaccount() {
  return (
    <div className='yup'>
        <div className='secu'></div>
        <div className="user-up">
            <div className="gradient"></div>
            <div className="up-up">
                <div className="user-profile">
                    <div></div>
                </div>
                <div className="profile-info">
                    <div>Profile</div>
                    <div>Update your profile and personal data</div>
                    <div>Admin: </div>
                </div>
            </div>
            <div className="user-down">
                <div className='hes'>
                    <div className="user-name">User Name :</div>
                    <div className="user-domain">Domain Name :</div>
                    <div className="user-admin">Email :</div>
                </div>
                <div className='he'>
                    <input type="text" className='name-data' placeholder='' value={'CHARLES SAMUEL TAMBA YEDIKOBO'}/>
                    <input type="text" className='domain-data' placeholder='Domaine.com'/>
                    <input type="text" className='admin-data' value={'charles.tamba@ktm-digit-innov.com'}/>
                </div>
            </div>
            <button>Back</button>
        </div>
    </div>
  )
}

export default Myaccount