import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css'
import param from '../components/adjust.png'
import DropdownItem from './DropdownItem'
import Drop from './Drop';
import Mails from './Mails';
import See from './See'

function Navbar() {
    const [open,setOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);
    const [selectedMail, setSelectedMail] = useState(null);
    const [sideopen,setsideOpen] = useState(false);
    const [selectedButton, setSelectedButton] = useState('all'); // Ajoutez cet état
    const datas = ["Coca","Chocolat","Beurre","Man","Cail"];
    const [values, setValues] = useState("");
    const [change, setchange] = useState("");
    //console.log(apiResponse)
    let menuRef = useRef();
    useEffect(() =>{
        let handler = (e)=>{
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
            
        };
        
        document.addEventListener("mousedown", handler);
        return()=>{
            document.removeEventListener("mousedown", handler);
        }
    } )
  return (
    <div className='All'>
        <header>
        <nav ref={menuRef}>
        <div className='menu' onClick={()=>{setsideOpen(!sideopen)}}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 30 30">
                <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                </svg>
            </div>
            <div className='Log'>
                MAILZY
            </div>
            <div className='search_block'>
                <button><FontAwesomeIcon icon="fa-regular fa-magnifying-glass" rotation={90} /></button>
                <input type="text" placeholder='search' className='search' value={values} onChange={(e) =>{setValues(e.target.value)}}/>
                
            </div>
            
                <ul className='list' >
                    <li className='log_out'>
                        <button><img src={param} alt="" /></button>
                    </li>
                    <li className='user_name'>
                        Samuel Charles
                    </li>
                    <li >
                        <button className='avatar' onClick={()=>{setOpen(!open)}} >cs</button>
                    </li> 
                    {/* <DropdownItem text = {LogOut}/> */}
                </ul>
                
            
        </nav>
        
        <div className='bon'>
            
            <div className={`bonbon ${sideopen? 'active' : 'inactive'}`}>
                {/* <div  className={`two ${sideopen? 'active' : 'inactive'}`}>
                    
                </div> */}
                <div className={`sidebar ${sideopen? 'active' : 'inactive'}`}>
                        <button className='NewMessage'><span>+</span>New Message</button>
                        <Drop setApiResponse={setApiResponse} change={setchange}/>
                        
                        <DropdownItem text = {"LogOut"}/>
                    </div>
                    <div className={`next ${sideopen? 'active' : 'inactive'}`}>
                        <div className="read-unread">
                        <button
                            className={selectedButton === 'all' ? 'selected' : ''}
                            onClick={() => setSelectedButton('all')}>
                            All
                        </button>
                        <button
                            className={selectedButton === 'read' ? 'selected' : ''}
                            onClick={() => setSelectedButton('read')}>
                            Read
                        </button>
                        <button
                            className={selectedButton === 'unread' ? 'selected' : ''}
                            onClick={() => setSelectedButton('unread')}>
                            Unread
                        </button>
                        </div>
                        <hr />
                        <div className="next-1">
                            <Mails apiResponse={apiResponse} setSelectedMail={setSelectedMail} change={change}/>
                        </div>
                        
                    </div> 
                    
            </div>
                 <See sideopen={sideopen} selectedMail={selectedMail}/>
            
        </div>
            
        {/* DIV POUR LES INFO DU PERSO */}
        <div className={`drop ${open? 'active' : 'inactive'}`}>
                    <ul className='drop-list'>
                        <DropdownItem text = {"LogOut"}/>
                    </ul>
                </div>
                <ul className='search_value'>
                    <div>
                    {
                        values && datas.filter((element) => element.toLocaleLowerCase().includes(values))
                        .map((element, index) => <li key={index}>{element}</li>)
                    }
                    </div>
                    
                </ul>
    </header>
    </div>
    
  )
}



export default Navbar