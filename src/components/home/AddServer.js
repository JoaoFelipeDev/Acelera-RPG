import React, {useEffect, useState} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ApiFB from '../../ApiFB';
import { v4 as uuidV4 } from 'uuid';


export default function AddServer({id, name, setServ}) {

    const [url_photo, setUrlPhoto] = useState();
    useEffect(()=>{
        const idUser = localStorage.getItem('UserLog');
        ApiFB.getDatabase().then((db)=>{
            db.ref('users').child(idUser).on('value',(snapshot)=>{
                setUrlPhoto(snapshot.val().URL_photo);
            })
        })
    
    },[]);

  
   
    const [name_server, setNameServer] = useState();

   
    const data = {
        criador: name,
        id_criador: id,
        servidor: name_server,
        id_server: uuidV4()
    }
    
    const dataUser ={
        URL_photo: url_photo,
        name: name,
        uid: id,
        status: 'jogando'
    }
    
  const dataStatus = {
      status: 'jogando'
  }
  
  

   const loadUser = async ()=>{
   


   
    ApiFB.getDatabase().then((db)=>{
        db.ref('servers').child(data.id_server).set(data);
        

        db.ref('servers/'+data.id_server).child('players/'+id).set(dataUser);

        db.ref('users/'+id).update(dataStatus);
        

        localStorage.setItem('roomActive',true);
        localStorage.setItem('roomId', data.id_server);
    })

    
    

   }

  

   function handleNameServerChange(e){

    setNameServer(e.target.value);
}

function  handleCancel() {
    setServ(false);

}

    


    return (
        <Container>
            <div className="card m-auto mt-5 addServer" style={{
           background: "#29292E"
        }} >
                <div className="card-title">
                    <h4 className="font">Crie sua sala</h4>

                </div>

                <div className="card-body">

               
                <Form.Label className="font" >Nome da Sala: </Form.Label>
                <Form.Control onChange={handleNameServerChange} required type="text" placeholder='Digite o nome da sala' />
            
                

                <Button  onClick={loadUser}  style={{ width: '100%' }} type='submit' className='btn mt-4 btn-light btn-lg btn-block' ><em className="font" >Crias sala</em></Button>
                <Button onClick={handleCancel}  style={{ width: '100%' }} type='submit' className='btn mt-4 btn-danger btn-lg btn-block' ><em className="font" >Cancelar</em></Button>

                </div>

            </div>
        </Container>
    )
}
