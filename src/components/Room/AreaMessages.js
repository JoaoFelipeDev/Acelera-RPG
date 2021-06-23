import React from 'react'
import { Component } from 'react';
import ApiFB from '../../ApiFB';

class AreaMessages extends Component {

state = {
    dataMsg: [],
    dataAudio: null
}

componentDidMount(){
    this.loadMessages();
}


     loadNewMessages = () => {
        const uidRoom = localStorage.getItem('roomId');

        ApiFB.getDatabase().then((db)=>{
            db.ref('servers/'+uidRoom+'/messages').on('child_added',(snapshot)=>{
                
                this.loadMessages();
                

                let objDiv = document.getElementById('msg');
                objDiv.scrollTo(objDiv.scrollHeight);
                
            })
        })

    }

    loadMessages = ()=>{

        console.log('chamou');

        const uidRoom = localStorage.getItem('roomId');

        ApiFB.getDatabase().then((db)=>{
            db.ref('servers/'+uidRoom+'/messages').on('value',(snapshot)=>{
                const message = [];
                    snapshot.forEach((data)=>{
                          message.push(data.toJSON());
                          
                    })

                    this.setState({
                        dataMsg: message
                    })

                    
            })
        })

    }

    

   render(){
    const {dataMsg} = this.state;
    return (
        <div className=' areaMessages'>
           
           {dataMsg.map((data)=>(
               <div id="msg" className=" styleMessages" key={data.key}>
                  <samp style={{fontSize: '0.7em',color:'burlywood'}}> {data.name}:</samp><br/>
                  <samp> {data.type == "texto" ? data.message : <samp style={{color:'red'}}>{data.message}</samp>}</samp><br/>
                  <samp style={{fontSize: '0.6em', color:'slategray'}} > {data.hora}</samp>
                  
               </div>
           ))}
        </div>
    )




   }
}
export default AreaMessages;