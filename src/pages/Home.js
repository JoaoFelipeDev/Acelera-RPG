import React from 'react';
import '../style/home.css';
import StatusBar from '../components/home/StatusBar';
import ApiFB from '../ApiFB';
import { Component} from 'react';
import Servers from '../components/home/Servers';
import AddServer from '../components/home/AddServer';
import { BrowserRouter } from 'react-router-dom';



class  Home extends Component {


  state = {
    
    addServer: false,
    data: [],
    id: null,
    name: null

  
  }

  componentDidMount(){

  this.loadCurrentUser();
    
  }

  
loadAddserver = (value)=>{
  this.setState({
    addServer: value
  })
}



loadCurrentUser = async ()=>{
    
   (await ApiFB.getCurrentUser()).onAuthStateChanged((user)=>{

    this.loadDataUsers(user.uid)
    localStorage.setItem('UserLog',user.uid);

    this.setState({
      id: user.uid
    })
  
   })

   


}

loadDataUsers = async (id)=>{
  
  ApiFB.getDatabase().then((db)=>{
    db.ref('users/'+id).on('value', (data)=>{

      // console.log('Atualizado');
     
     const dataJson = data.val();
      this.setState({
        name: data.val().name
      })
     
    
     
     this.setState({
      data: dataJson
    })

    
   })
 })
  
 ApiFB.getDatabase().then((db)=>{
  db.ref('users/'+id).on('child_changed', (data)=>{

    // console.log('Atualizado');
   
    

      // console.log('Atualizado');
     
     const dataJson = data.val();
      this.setState({
        name: data.val().name
      })
     
    
     
     this.setState({
      data: dataJson
    })

    
   
   

  
 })
})
 

}





  



   
render(){

  const {data, addServer, game} = this.state;

  return (
    <BrowserRouter>
    
    
      <StatusBar  photo={data.URL_photo} name={data.name} />
      {addServer ?<AddServer name={this.state.name} id={this.state.id} setServ={this.loadAddserver}/> : <Servers setServ={this.loadAddserver} />}
      
      {/* <MenuRight  /> */}
      
    </BrowserRouter>
)




}

}

export default Home;
