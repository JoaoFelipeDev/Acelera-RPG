import React, {  useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ApiFB from '../../ApiFB';






export default function SingUp({changeSignin, log}) {


const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [name, setNome] = useState();

const values ={
    URL_photo: "https://firebasestorage.googleapis.com/v0/b/rpg-acelera.appspot.com/o/image_perfil%2FiconLogo.png?alt=media&token=3187d00c-0b25-4a70-aac8-681178348c77",
    name: name,
    email: email ,
   
}


    function handleSignIn(){
        changeSignin(true);
    }

    function handleSubmit(e){
        e.preventDefault();
        
       
       ApiFB.signUp(values.email, password).then((firebaseUser) => {
        
       
        ApiFB.saveData(firebaseUser.user.uid,values);
        log(true);
  

     
        
   
})
       
        
      
    }

    function handleEmailChange(e){

        setEmail(e.target.value);
    }

    function handlePasswordChange(e){

        setPassword(e.target.value);
    }

    function handleNomeChange(e){

        setNome(e.target.value);
    }


    

   
    
    

    return (
        

        <BrowserRouter>

        <div className="singUp-right">
            <Container  style={{ height: '100vh' }}>
                <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
               
                <Form.Label className="mt-5 display-6 font">Cadastre sua conta</Form.Label> <br/>
                <Form.Label className="font" >Nome: </Form.Label>
                <Form.Control onChange={handleNomeChange} required type="text" placeholder='Digite seu nome ou apelido' />
                <Form.Label className="font" >Email: </Form.Label>
                <Form.Control onChange={handleEmailChange} required type="email" placeholder='Digite seu email' />
                <Form.Label className="font"  >Senha: </Form.Label>
                <Form.Control onChange={handlePasswordChange} required type="password" placeholder='Digite sua senha' />

                <Button  style={{ width: '100%' }} type='submit' className='btn mt-4 btn-info btn-lg btn-block' ><em className="font" >Cadastrar</em></Button>
                <Button onClick={handleSignIn}  style={{ width: '100%' }} variant="secondary" type='submit' className='btn mt-2  btn-lg btn-block' ><em className="font" >Ja tenho conta</em></Button>
  

                 

                </Form.Group>

                
                </Form>
                <em className="font "
                style={{ fontSize:'.7em', textAlign:'right' }}
                >v 1.0</em>  
            </Container>
           
        </div>
        
        
        </BrowserRouter>
        
    )
}
