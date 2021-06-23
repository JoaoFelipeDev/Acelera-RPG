import React from 'react'
import { Container } from 'react-bootstrap';
import '../../style/menuRight.css';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import ApiFB from '../../ApiFB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
     faHome, 
     faUserFriends, 
     faUser,
     faEnvelope,
     faEnvelopeOpen,
     faCommentDots,
     faSignOutAlt,
     faBell,
     faCogs,
     faInfoCircle 
    } from '@fortawesome/free-solid-svg-icons';


export default function MenuRight() {
    const[log, setLog] = useLocalStorage('log');
    function singOut(){

        localStorage.clear();
        ApiFB.signOut().then(()=>{
            
         
                window.location.reload();
           
           
 });



 



}

    const home = <FontAwesomeIcon className="mr-2 mb-5" icon={faHome} />
    const contact = <FontAwesomeIcon className="mr-2 mb-5" icon={faUserFriends} />
    const perfil = <FontAwesomeIcon className="mr-2 mb-5" icon={faUser} />
    const email = <FontAwesomeIcon className="mr-2 mb-5" icon={faEnvelope} />
    
    const converstions = <FontAwesomeIcon className="mr-2 mb-5" icon={faCommentDots} />
    const exit = <FontAwesomeIcon className="mr-2 mb-5" icon={faSignOutAlt} 
    onClick={singOut}
    style={{
        cursor: 'pointer',
    }}
    />
    const notifications = <FontAwesomeIcon className="mr-2 mb-5" icon={faBell} />
    const config = <FontAwesomeIcon className="mr-2 mb-5" icon={faCogs} />
    const info = <FontAwesomeIcon className="mr-2 mb-5" icon={faInfoCircle} />
    return (
        <Container className="  position-absolute top-0 end-0 " style={{
            width: '50px', 
            height:'600px',
            color: 'white',
            justifyContent: 'center',
            opacity: '.6',
            backgroundColor: '#29292E',
            margin: '20px',
            padding: '15px',
            borderRadius:'15px',
            boxShadow:'inset 0 0 1em gray, 0 0 1em black',
            
            }}>
            {home}
            {perfil}
            {contact}
            {email}
            {converstions}
            {notifications}
            {config}
            {info}
            {exit}

        </Container>
    )
}
