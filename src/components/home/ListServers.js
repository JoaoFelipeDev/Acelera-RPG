import React, {Component, useEffect, useState} from 'react'
import ApiFB from '../../ApiFB';
import { Button } from 'react-bootstrap';
import '../../style/app.css'
import { Alert } from 'bootstrap';
import { Link, Redirect, BrowserRouter } from 'react-router-dom';


class  ListServers extends Component {

    state = {
        data: [],
        id: null,
        nomeBox: null,
        uidRoom: null,
        searchValue: '',
        dataUser: [],
        dataStatus: {status: 'jogando'}
    }

componentDidMount(){

    this.loadServers();

}
 


 loadServers = async ()=>{

    ApiFB.getDatabase().then((db)=>{

        const serverArray = [];
           db.ref('servers').on('value', (snpashot)=>{

             
           
            snpashot.forEach((data)=>{
                serverArray.push(data.toJSON());
            })
            
            
            
        });

        this.setState({
            data: serverArray
        })
    })

    ApiFB.getDatabase().then((db)=>{
       
        db.ref('servers').on('child_changed', ()=>{

            window.location.reload();
            
        });

        
    })
    
   
 }


 openBoxVerific = (nameBox, key) =>{
    
   

    const windowServ = document.getElementById('windowServ');
    const servidores = document.getElementById('servidor');
    servidores.style.display = 'none';
    windowServ.style.display = 'block';

    this.setState({
        nomeBox: nameBox,
        uidRoom: key

    })

 }

 closeBox = () =>{
    
   

    const windowServ = document.getElementById('windowServ');
    const servidores = document.getElementById('servidor');
    windowServ.style.display = 'none';
    servidores.style.display= 'block';



 }

 entrar = async () =>{

    (await ApiFB.getCurrentUser()).onAuthStateChanged((user)=>{

        
    
        this.setState({
          id: user.uid
        })
      
       })

    ApiFB.getDatabase().then((db)=>{
        
        db.ref('users/'+this.state.id).on('value',(data)=>{
            this.setState({
                dataUser: data.toJSON()
            })
            })

        db.ref('servers/'+this.state.uidRoom).child('players/'+this.state.id).set(this.state.dataUser);

        db.ref('users/'+this.state.id).update(this.state.dataStatus);
    })
    
    localStorage.setItem("roomActive",true);
    localStorage.setItem("roomId",this.state.uidRoom);
    


 }

 handleChange = (e) =>{
    const { value } = e.target;

    this.setState({
        searchValue: value
    });
 }

  
        
    render(){
     
        const{data, searchValue} = this.state;

        const filterDatas = !!searchValue ?

        data.filter(d=>{
            return d.servidor.toLowerCase().includes(searchValue.toLowerCase());
        }) :

        data;

        return (
            <BrowserRouter>
             <div style={{marginTop:'0px'}}>
             <input onChange={this.handleChange} value={this.state.searchValue} placeholder="Pesquisar" type="search" style={{marginLeft:'100px',backgroundColor: "#29292E", color:'white'}} />

             </div>
             
            <div id="servidor"  style={{height:'317px',maxHeight:'317px', overflow:'auto'}}>

            {data.length == 0 ? <h3 className="font">Não há servidores criados ainda crie ja o seu!!</h3> 
            : filterDatas.map(data=>(
              

                <div onClick={()=>this.openBoxVerific(data.servidor, data.id_server)}  key={data.id_criador} id="servidores"  style={{
                 
                }}>
               Sala: {data.servidor} <br/>
               Dono: {data.criador}
              
                </div>
               
             
            ))
            }


            </div>

            <div id="windowServ">
            Deseja entrar na sala {this.state.nomeBox}? <br/>
            <Button onClick={this.entrar} className="btn btn-secondary" style={{marginRight: "10px", marginTop:"5px"}}> Entrar!</Button>
            <Button onClick={this.closeBox} variant="danger"> Cancelar!</Button>
            
            </div>
            
           </BrowserRouter>
         )


    }


   
}
export default ListServers;

