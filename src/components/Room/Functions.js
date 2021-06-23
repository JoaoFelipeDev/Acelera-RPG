import React, { useState } from 'react'
import {ListGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20,  faHandPaper, faMicrophone, faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import ApiFB from '../../ApiFB';
import  d20 from '../../image/d20.png';
import  d12 from '../../image/d12.png';
import  d8 from '../../image/d8.png';
import  d10 from '../../image/d10.png';
import  d6 from '../../image/d6.png';
import  d4 from '../../image/d4.png';





export default function Functions() {
    const [name, setName] = useState("");
    const [message, setMessage]= useState("");
    const dataH = new Date();
    let hour = dataH.getHours();
    let minute = dataH.getMinutes();

    const dataMsg = {
        hora: hour+':'+minute,
        message: message,
        name: name,
        type:'dice'
        
    }

    function diceRoll(dice) {
        const roomId = localStorage.getItem('roomId');
        const userLog = localStorage.getItem('UserLog');
        

        let value = parseInt(Math.random()*(dice - 1+1)+1);
        if(value == 20){
             setMessage('Rolou d'+parseInt(dice)+': '+value+' - ACERTO CRITICO ');
        }else{
            setMessage('Rolou d'+parseInt(dice)+': '+value);
        }

        

        

        ApiFB.getDatabase().then((db)=>{
            db.ref('users/'+userLog).on('value',(snapshot)=>{

                setName(snapshot.val().name);
            });

            setTimeout(()=>{
                db.ref('servers/'+roomId+'/messages').push(dataMsg)
            },1500)
        })

    }

    function exitUser() {
        
        const roomId = localStorage.getItem('roomId');
        const userLog = localStorage.getItem('UserLog');

        ApiFB.getDatabase().then((db)=>{
            db.ref('servers/'+roomId).child('players/'+userLog).remove();
        });

        localStorage.removeItem('roomId');
        localStorage.removeItem('roomActive');
        window.location.reload();
    }


    
    const dice20 = <img onClick={()=>diceRoll(20)} src={d20} className="mr-2 mb-3" />
    const dice12 = <img onClick={()=>diceRoll(12)} src={d12} className="mr-2 mb-3" />
    const dice10 = <img onClick={()=>diceRoll(10)} src={d10} className="mr-2 mb-3" />
    const dice8 = <img  onClick={()=>diceRoll(8)} src={d8} className="mr-2 mb-3" />
    const dice6 = <img  onClick={()=>diceRoll(6)} src={d6} className="mr-2 mb-3" />
    const dice4 = <img  onClick={()=>diceRoll(4)} src={d4} className="mr-2 mb-3" />
    const exit = <FontAwesomeIcon onClick={exitUser} style={{cursor:'pointer'}} className="mr-2 mb-5" icon={faDoorOpen} />
    return (
        <div className="listFunction">
        <h5>Funções</h5>
        <ul className="list-group " style={{listStyle:'none'}}>
            
            
           
            <li> {dice20} </li>
            <li> {dice12} </li>
            <li> {dice10} </li>
            <li> {dice8} </li>
            <li> {dice6} </li>
            <li> {dice4} </li>
          
         
            <li style={{color:'red'}}> {exit} </li>

        </ul>
        </div>
    )
}
