import React from 'react'
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import ListServers from './ListServers';
import Game from '../../pages/Game';

export default function Servers({setServ}) {
    const game = localStorage.getItem("roomActive");
    const add = <FontAwesomeIcon className="ml-5" icon={faPlusCircle} />


    function handleAddServer(){
        setServ(true);
    }

  
    return (
        <>
       {game ? <Game />  :  <Container >
        <section>

        <div className="painelServidor card m-auto mt-5 " style={{
            backgroundColor: "#29292E"
        }}>
            <div className="card-title" style={{height:'80px',maxHeight:'80px'}}>
            <h4 className="font ">Servidores ativos: </h4> 
            
            <Button onClick={handleAddServer} variant="secondary"> <em className="font ">Criar servidor </em> {add} </Button>
            
            <hr/>
            </div>
            <div className="card-body" >
               
               <ListServers />
              
                
            </div>

        </div>


        </section>

        </Container> }
        

        </>
    )
}
