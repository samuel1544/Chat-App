import React from 'react'
import './Security.css'

function Security() {
  return (
    <div className='se'>
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
                <div className="down-sec">
                <div className="pass-down">
                    <div className="sec">This is the Account's security section. If you wish to change your password proceed as follow</div>
                    <div>
                        <div className="old">Enter Your old password</div>
                        <input type="password" />
                    </div>
                    <div>
                        <div className="old">Enter Your new password</div>
                        <input type="password" />
                    </div>
                    <div>
                        <div className="old">Confirm the password</div>
                        <input type="password" />
                    </div>
                </div>
                </div>

                <button className='pass-save'>Save</button>
                
        </div>
    </div>
    
  )
}

export default Security