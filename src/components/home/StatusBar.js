import React, { useState } from 'react';
import { Button, Image, Form } from 'react-bootstrap';
import ApiFB from '../../ApiFB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,
    faHome, 
     faUserFriends, 
     faUser,
     faEnvelope,
     faEnvelopeOpen,
     faCommentDots,
     faSignOutAlt,
     faBell,
     faCogs,
     faInfoCircle,
     faCheck,
     faTimesCircle


} from '@fortawesome/free-solid-svg-icons';


export default function StatusBar({photo, name}) {
  
  const [status, setStatus]= useState(true);
  const [nameUpdate, setNameUpdate] = useState(null);
  const [photoUpdate, setPhotoUpdate] = useState(null);

  function handleChangePhoto(e) {
    const file = e.target.files[0];
    

    




    setPhotoUpdate(file);
    
    
    
    

    

  }

 


function saveUpdateName() {
  const userLog = localStorage.getItem('UserLog');
  ApiFB.getDatabase().then((db)=>{
      
      db.ref('users/'+userLog).update({name: nameUpdate});
  });
  
}

function saveUpdatePhoto() {
  const userLog = localStorage.getItem('UserLog');
  ApiFB.getStorage(userLog, photoUpdate);

  ApiFB.storageRef().then((storage)=>{

    storage.ref('profile-'+userLog).child('photo_profile.jpg').getDownloadURL().then((urlImage)=>{
      
      ApiFB.getDatabase().then((db)=>{
        db.ref('users/'+userLog).update({URL_photo: urlImage});
      })
    })
  })

}

function checkUpdateStatus() {
  
  if(nameUpdate != null){
    saveUpdateName();
  }
  


}

  function handleChange(e) {

    setNameUpdate(e.target.value);
    
  }


  function exitUpdate(){

    setStatus(true);
  }
 

    function singOut(){

        localStorage.clear();
        ApiFB.signOut().then(()=>{
            
         
                window.location.reload();
           
           
 });






}
    const cancel = <FontAwesomeIcon onClick={exitUpdate} style={{width:'50px',cursor:'pointer', color:'red'}} icon={faTimesCircle} />
    const check = <FontAwesomeIcon onClick={checkUpdateStatus} style={{width:'50px',cursor:'pointer', color:'white'}} icon={faCheck} />
    const bars = <FontAwesomeIcon style={{width:'50px',cursor:'pointer', color:'white'}} icon={faBars} />
    const email = <FontAwesomeIcon  style={{width:'50px',cursor:'pointer', color:'white'}} icon={faEnvelope} />
    const notifications = <FontAwesomeIcon cstyle={{width:'50px',cursor:'pointer', color:'white'}} style={{width:'50px',cursor:'pointer', color:'white'}} icon={faBell} />
    const config = <FontAwesomeIcon onClick={()=> setStatus(false)} style={{width:'50px',cursor:'pointer', color:'white'}} icon={faCogs} />
    const exit = <FontAwesomeIcon  icon={faSignOutAlt} 
    
    onClick={singOut}
    style={{
        cursor:'pointer',
        width:'50px',
        color:'red'
    }}
    />
    




    return (
        <header>
            
                <nav className="navbar navbar-expand-md navbar-light fixed-top navbar-transparente" >
                        <div className="container">
                        {status ? <Image src={photo} className=" px-2 avatar rounded-circle"
                style={{
                    height:'40px'
                }}
                /> : <>
                 <Image src={photo} className=" px-2 avatar rounded-circle"
                style={{
                    height:'40px',
                    width:'60px'
                }}
                /> 

                <input type="file" accept="image/*" onChange={handleChangePhoto} className="form-control-file" style={{color:'white'}} />
                <button className="btn btn-light" onClick={saveUpdatePhoto}>Upload</button>
                 </>
                
                }
                <em style={{color:'white'}}>{name}</em><br/> {status ? <></>: <> <input onChange={handleChange} type='text' placeholder='Alterar nome'
                style={{backgroundColor:'#29292E', color:'white', outline:'0', boxShadow:'0 0 0 0', border: '0 none'}}
                /> {check} {cancel} </> }
                <button className="navbar-toggler" data-toggle="collapse" data-target="#nav-principal"> {bars}  </button>
                            </div>   
                            

                            <div class="collapse navbar-collapse" id="nav-principal">
            <ul class="navbar-nav ml-auto">
              
              <li class="nav-item">
                {email}
              </li>
              <li class="nav-item">
                {config}
              </li>
              <li class="nav-item divisor">
                
              </li>
              <li class="nav-item">
                {notifications}
              </li>
              <li class="nav-item">
                {exit}
              </li>
  
            </ul>
  
          </div>

                


                    </nav>
        </header>
    )
}



