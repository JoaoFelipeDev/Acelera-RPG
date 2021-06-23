import React, { Component } from 'react'
import {Container} from 'react-bootstrap';

import ApiFB from '../ApiFB';
import AreaMessages from '../components/Room/AreaMessages';
import Functions from '../components/Room/Functions'
import ListUsers from '../components/Room/ListUsers';
import Messages from '../components/Room/Messages';

class Game extends Component {

    state = {
        data: [],
        id: null
    }
componentDidMount(){

  

        
    this.loadData();
}

   

    loadData = async () =>{
      
      ApiFB.getDatabase().then((db)=>{
                const id = localStorage.getItem("roomId");
                this.setState({
                    id: id
                })
                const dataDb = [];
                   db.ref('servers/'+id).on('value', (data)=>{
                       dataDb.push(data.toJSON());
                   })
      
                   this.setState({
                       data: dataDb
                   })
              })
     

        // console.log(this.state.data);
    }


   render(){
    const {data} = this.state;

    return (
       <section>

<Container  >
           {data.map((data)=>(
               <div className="windowRoom card" style={{
                backgroundColor: "#29292E"
            }} >

            <div className="card-title">
            <h4 className="font " style={{marginLeft:'40%'}} >Sala: {data.servidor}<br/> <span>Dono: {data.criador} </span></h4>
            </div>
               
               <div className="card-body">

               <div className="row">
                <div className="col">
                <Functions />
                </div>
                <div className=" col " style={{}}>
                    <AreaMessages/>
                
                </div>
                <div className=" col" style={{ overflow:'auto'}}>
                   <ListUsers id={this.state.id} />
                </div>
               </div>
               <Messages />

               </div>
               
               </div>
           ))}
        </Container>


       </section>
     )


   }
}

export default Game;


{/* <h4 className="font " style={{marginLeft: '25%'}} >Sala: {data.servidor}<br/> <span>Dono: {data.criador} </span></h4>
               <hr/>
               <div>
               <div className="row">
                <div className="col">
                <Functions />
                </div>
                <div className=" col-8 " style={{}}>
                    <AreaMessages/>
                
                </div>
                <div className=" col" style={{ overflow:'auto'}}>
                   <ListUsers id={this.state.id} />
                </div>
               </div>
               <Messages />

               </div> */}