import React from 'react'
import { Component } from 'react';
import ApiFB from '../../ApiFB'

class ListUsers extends Component {

   state = {
       dataUsers: []
   }

   componentWillMount(){
        this.loadUsers(this.props.id);
   }

   loadUsers = (id)=>{
       
    ApiFB.getDatabase().then((db)=>{
        db.ref('servers/'+id).child('players').on('value', (data)=>{
            
            const dataJson = [];
            data.forEach((snapshot)=>{
                console.log(snapshot.toJSON());
                dataJson.push(snapshot.toJSON());
              

            })

            this.setState({
                dataUsers: dataJson
            })
            console.log(this.state.dataUsers);
        })
    })
   }

   loadNewUsers = ()=>{
       ApiFB.getDatabase().then((db)=>{
           db.ref('servers/'+this.props.id).child('players').on('child_added', ()=>{

            this.loadUsers(this.props.id);
           });
       })
   }
   
   loggedOutUser = () =>{

    ApiFB.getDatabase().then((db)=>{
        db.ref('servers/'+this.props.id).child('players').on('child_removed', ()=>{
            console.log(this.props.id)
         this.loadUsers(this.props.id);
        });
    })

   }
   


  
   
    render(){
        const {dataUsers} = this.state;
        return (
            <div>
                <h5>Participantes:</h5>
              {dataUsers.map((data)=>(
                  <div key={data.uid} className="listUsers">
                   <img src={data.URL_photo} className="avatar rounded-circle" style={{height:'20px'}}></img>   {data.name}
                      
                  </div>
              ))}  
            </div>
        )

    }
}

export default ListUsers


