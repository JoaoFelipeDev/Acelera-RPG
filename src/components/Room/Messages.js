import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIcons} from '@fortawesome/free-solid-svg-icons';
import ApiFB from '../../ApiFB';

const icons = <FontAwesomeIcon style={{height:'30px', width: '70px'}} icon={faIcons} />



export default function () {
    const [idRoom, setIdRoom]= useState();
    const [message, setMessage]= useState();
    const [name, setName]= useState();
    const data = new Date();
    let hour = data.getHours();
    let minute = data.getMinutes();
    
    
    // console.log(hour+':'+minute);
    const dataMsg = {
        name: name,
        message: message,
        hora: hour+':'+minute,
        type:'texto'
    };

    useEffect(()=>{
        const uid = localStorage.getItem('UserLog');
        setIdRoom(localStorage.getItem('roomId'));
        ApiFB.getDatabase().then((db)=>{
            db.ref('users/'+uid).on('value', (snapshot)=>{
               
                setName(snapshot.val().name);
            })
          
        });
    }, [])

    function handleMessageChenged(e) {

        setMessage(''+e.target.value);

        
        
    }
    function sendMessage() {
        ApiFB.getDatabase().then((db)=>{
            db.ref('servers/'+idRoom+'/messages').push(dataMsg);

        })
        document.getElementById('message').value = '';

    }

    return (
        <div className="messages relative-top">
            <div className="row">
            <div className="col">
                    

            </div>
            <div className=" col-6">
                    
                        <Form.Control type="text" id="message"  onChange={handleMessageChenged} placeholder="Digite sua mensagem" className="message" style={{backgroundColor: '#29292E', color: 'white'}} />
                        
                    
            </div>
            <div className="col">
            <Button onClick={sendMessage} variant='secondary'> Enviar</Button>
            </div>
            </div>
            
        </div>
    )
}
