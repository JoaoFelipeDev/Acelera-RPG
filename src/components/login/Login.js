import React , { useState }from 'react'

import SingIn from './SingIn';
import SingUp from './SignUp';



export default function Login({setLog}) {

    const [verific, setVerific]= useState(true);
    const[log, setUserLog] = useState(false);

    if(log){
        setLog(true)
    }else{
        setLog(false);
    }

  
    
    

    return (
       <div className="container "align="center">

                <div className="login">
             
              { verific ? <SingIn log={setLog} changeSignUp={setVerific} /> : <SingUp changeSignin={setVerific} log={setLog} /> }              
                 
            







                </div>
                )

       </div>
    )
}
