import React, {  useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import ApiFB from '../../ApiFB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';



export default function SingIn({changeSignUp, log}) {
const element = <FontAwesomeIcon className="mr-2" icon={faGoogle} />

const [email, setEmail] = useState();
const [senha, setSenha] = useState();

const values ={
    email: email ,
    senha: senha
}

function handleSingUp(){
    changeSignUp(false);
}
    function handleSubmit(e){
        e.preventDefault();
        
       
      ApiFB.signIn(values.email, values.senha).then((user)=>{
            log(true);
            console.log(user.user.uid);
      })
    
        
        
    }

    function handleEmailChange(e){

        setEmail(e.target.value);
    }

    function handleSenhaChange(e){

        setSenha(e.target.value);
    }

    const actionLoginGoogle = async ()=>{
       
       await ApiFB.googleLogar().then((res)=>{

        const data = {
            name: res.user.displayName,
            email: res.user.email,
            URL_photo: res.user.photoURL,
           
        }
        console.log("usuario logado1: "+ res.uid);
        ApiFB.saveData(res.user.uid,data);
        log(true);

       



       })

      

        
       

      
      
       
    }

    

   
    
    

    return (
        

        <div className="login-right">
            <Container  style={{ height: '100vh' }}>
                <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group>
               
                <Form.Label className="mt-5 display-6 font">Entre nesta jornada</Form.Label>
              
                <Form.Label className="font" >Email: </Form.Label>
                <Form.Control onChange={handleEmailChange} required type="email" name="email" placeholder='Digite seu email' />
                <Form.Label className="font"  >Senha: </Form.Label>
                <Form.Control onChange={handleSenhaChange} required type="password" placeholder='Digite sua senha' />

                <Button  style={{ width: '100%' }} type='submit' className='btn mt-4 btn-info btn-lg btn-block' variant="secondary"><em className="font" >Entrar</em></Button>
  

                <Button onClick={actionLoginGoogle} style={{ width: '100%' }} className="text-right font mt-3"> Login com {element}oogle</Button> 
                <Button  style={{ width: '100%' }} variant="secondary" type='submit' className='btn mt-2  btn-lg btn-block' onClick={handleSingUp} ><em className="font" >Cadastrar</em></Button>
                

                </Form.Group>
                

                
                </Form>
                <em className="font "
                style={{ fontSize:'.7em', textAlign:'right' }}
                >v 1.0</em>
                    
            </Container>
            
           </div>
            
        
    )
}
