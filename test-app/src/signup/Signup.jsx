import React from 'react'

import notif from '../components/notif.png'
import emoji from '../components/emoji.png'
import a from '../components/1.png'
import coeur from '../components/coeur.png'
import like from '../components/like.png'
import speech from '../components/speech2.png'


function Signup() {
  return (
    <div className="container">
            <div className="board">
                <div className="left">
                    <img src={notif} alt="" className="deco a"/>
                    <img src={a} alt="" className="deco b" />
                    <img src={emoji} alt="" className="deco c" />
                    <img src={coeur} alt="" className="deco d" />
                    <img src={like} alt="" className="deco e" />
                    <img src={speech} alt="" className="speechless" />
                </div>
                <div className="right">
                    <div className="sign-in">
                        <div>
                            <p>Already have an account ?</p>
                        </div>
                        <div>
                            <button className="sign"><a href="#">SIGN IN</a></button><br/>
                        </div>
                        
                    </div>
                    <div className="sign-up">
                        <div className="wel">
                            <h1>Welcome to <span>TALKING</span></h1>
                            <p className="mes">Register your account</p>
                        </div>
                        <form>
                            <div>
                                <label for="">Username</label><br/>
                                <input type="text" name="username" id="" placeholder="Enter your username" className="write" required onChange={(e) =>{Setusername(e.target.value)}}/>
                            </div>
                            <div>
                                <label for="">Email</label><br/>
                            <input type="email" placeholder="Example@gmail.com" className="write" name="email" required onChange={(e) =>{Setemail(e.target.value)}}/>
                            </div>
                            <div>
                                <label for="">Password</label><br/>
                            <input type="password" placeholder="Enter your password" className="write" name="password" required onChange={(e) =>{Setpassword(e.target.value)}}/>
                            </div>
                            <div>
                                <label for="">Confirm your password</label><br/>
                            <input type="password" placeholder="Enter your password" className="write" />
                            </div>
                            <div>
                                <button className="sub"><a href="#">Sign up</a></button>
                            </div>
                        </form>
                         <div className="create">
                            <div>
                                <p className="mes">create account with</p>
                            </div>
                            <div>
                                <button>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g mask="url(#mask0_9_57)">
                                        <path d="M39.7586 20.4593C39.7586 19.0998 39.6467 17.7329 39.4082 16.3954H20.278V24.097H31.2329C30.7783 26.581 29.3177 28.7784 27.1789 30.1745V35.1717H33.7146C37.5527 31.6884 39.7586 26.5442 39.7586 20.4593Z" fill="#4285F4"/>
                                        <path d="M20.278 40C25.748 40 30.3611 38.2288 33.722 35.1716L27.1863 30.1744C25.3679 31.3944 23.0205 32.0852 20.2854 32.0852C14.9942 32.0852 10.5079 28.565 8.89817 23.8324H2.15375V28.9838C5.59677 35.7377 12.6095 40 20.278 40Z" fill="#34A853"/>
                                        <path d="M8.8907 23.8324C8.04113 21.3485 8.04113 18.6588 8.8907 16.1749V11.0233H2.15375C-0.722879 16.6746 -0.722879 23.3327 2.15375 28.9839L8.8907 23.8324Z" fill="#FBBC04"/>
                                        <path d="M20.278 7.91475C23.1695 7.87067 25.9641 8.94359 28.0583 10.9131L33.8487 5.203C30.1823 1.80783 25.3158 -0.058786 20.278 4.9981e-06C12.6094 4.9981e-06 5.59677 4.26237 2.15375 11.0233L8.89071 16.1749C10.493 11.4349 14.9868 7.91475 20.278 7.91475Z" fill="#EA4335"/>
                                        </g>
                                        </svg>
                                </button>
                            </div>
                            <div>
                                <button>
                                    <svg width="48" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.06829 35.3309C9.01556 35.4536 8.82842 35.4899 8.65793 35.4059C8.48428 35.3259 8.38673 35.1593 8.44303 35.0366C8.49456 34.9109 8.68212 34.8759 8.85537 34.9596C9.02944 35.0403 9.12855 35.2086 9.06829 35.3309Z" fill="#1B1817"/>
                                        <path d="M10.038 36.4426C9.92381 36.5516 9.70058 36.501 9.54912 36.329C9.39253 36.1576 9.36318 35.928 9.47896 35.8176C9.59669 35.7093 9.81318 35.7603 9.97019 35.9313C10.1268 36.105 10.1573 36.3326 10.038 36.4426Z" fill="#1B1817"/>
                                        <path d="M10.9821 37.86C10.8354 37.9647 10.5955 37.8667 10.4472 37.6477C10.3005 37.429 10.3005 37.1664 10.4504 37.0614C10.5991 36.9564 10.8354 37.051 10.9856 37.268C11.1319 37.4904 11.1319 37.753 10.9821 37.86Z" fill="#1B1817"/>
                                        <path d="M12.2754 39.2293C12.1441 39.378 11.8646 39.338 11.66 39.135C11.4507 38.9366 11.3924 38.655 11.524 38.5063C11.6569 38.3573 11.938 38.3993 12.1441 38.6003C12.3519 38.7986 12.4153 39.082 12.2754 39.2293Z" fill="#1B1817"/>
                                        <path d="M14.0594 40.0243C14.0015 40.217 13.7323 40.3046 13.4611 40.2226C13.1903 40.1383 13.0131 39.9126 13.0679 39.7176C13.1241 39.5236 13.3945 39.4326 13.6677 39.52C13.9381 39.604 14.1157 39.8283 14.0594 40.0243Z" fill="#1B1817"/>
                                        <path d="M16.0189 40.1716C16.0257 40.3746 15.7957 40.543 15.511 40.5466C15.2248 40.553 14.9932 40.389 14.9901 40.1893C14.9901 39.9843 15.2148 39.8176 15.5011 39.8126C15.7858 39.807 16.0189 39.97 16.0189 40.1716Z" fill="#1B1817"/>
                                        <path d="M17.8423 39.8526C17.8764 40.0506 17.6785 40.2539 17.3958 40.3083C17.1179 40.3603 16.8606 40.2383 16.8253 40.0416C16.7908 39.8386 16.9922 39.6353 17.2698 39.5829C17.5528 39.5323 17.8062 39.6513 17.8423 39.8526Z" fill="#1B1817"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.9426 0C10.7212 0 0 11.0169 0 24.6076C0 35.48 6.86027 44.704 16.3734 47.9577C17.5699 48.1853 18.0092 47.424 18.0092 46.774C18.0092 46.187 17.9871 44.2487 17.9767 42.1927C11.3159 43.681 9.91038 39.289 9.91038 39.289C8.82127 36.445 7.25199 35.6887 7.25199 35.6887C5.0797 34.1613 7.41574 34.1927 7.41574 34.1927C9.81999 34.3657 11.0859 36.729 11.0859 36.729C13.2214 40.4903 16.687 39.4027 18.0533 38.774C18.2682 37.1837 18.8886 36.0977 19.5734 35.4837C14.2554 34.8613 8.66504 32.7513 8.66504 23.3224C8.66504 20.6358 9.60032 18.4406 11.1319 16.7174C10.8834 16.0972 10.0638 13.5947 11.3639 10.2052C11.3639 10.2052 13.3744 9.54387 17.9498 12.7276C19.8596 12.1824 21.9078 11.9089 23.9426 11.8996C25.9773 11.9089 28.0271 12.1824 29.9405 12.7276C34.5104 9.54387 36.5179 10.2052 36.5179 10.2052C37.8214 13.5947 37.0015 16.0972 36.7528 16.7174C38.2878 18.4406 39.217 20.6358 39.217 23.3224C39.217 32.7737 33.6159 34.8547 28.2844 35.464C29.1432 36.2277 29.9083 37.7253 29.9083 40.021C29.9083 43.3137 29.8806 45.9633 29.8806 46.774C29.8806 47.4287 30.3116 48.196 31.5252 47.9543C41.0332 44.697 47.8845 35.4763 47.8845 24.6076C47.8845 11.0169 37.165 0 23.9426 0Z" fill="#1B1817"/>
                                        </svg>
                                </button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Signup