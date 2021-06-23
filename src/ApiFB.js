import firebase  from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firestore';
import 'firebase/firebase-database';
import 'firebase/storage';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database();


export default{
    googleLogar: async () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        let result = await firebase.auth().signInWithPopup(provider);
        return result;
    },

    saveData: async (uid, data)=>{

  
   
        await db.ref('users').child(uid).set(data);
     
       


    },

    getCurrentUser: async () =>{

        const user =  firebaseApp.auth();

        return user;
        
        
        

     



    },

    getDatabase: async ()=>{

        const dbRef = firebaseApp.database();

        return dbRef;

        
    },

    signOut: async ()=>{

        const exit = await firebaseApp.auth().signOut();


        return exit;
    },

    signIn: async (email, password)=>{
  

   const login = await firebaseApp.auth().signInWithEmailAndPassword(email, password);

   return login
},

signUp: async (email, password)=>{

    const signUp = await firebaseApp.auth().createUserWithEmailAndPassword( email, password );

    return signUp;
    
},


    getStorage: async (id, photo)=>{

     await firebaseApp.storage().ref('profile-'+id).child('photo_profile.jpg').put(photo);


     

    },

    storageRef: async () =>{

    
    const ref =  await firebaseApp.storage();

    return ref;

    
    }


    


}