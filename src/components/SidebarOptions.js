import React from 'react'
import styled from 'styled-components'
import { useCollection } from 'react-firebase-hooks/firestore';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { enterRoom } from "../features/appSlice"

import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyCkjydfryZThw1zW1UAlp-oKYmonN0hnFw",
    authDomain: "slack-clone-7b6a9.firebaseapp.com",
    projectId: "slack-clone-7b6a9",
    storageBucket: "slack-clone-7b6a9.appspot.com",
    messagingSenderId: "738021950792",
    appId: "1:738021950792:web:86bb62b7caaf2a6faf9f7d",
    measurementId: "G-YWWTG2P9B0"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //const db = getFirestore(firebaseApp);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  



function SidebarOptions({Icon, title, addChannelOption, id}) {
    const dispatch = useDispatch()

    const userCollection = collection(db, "rooms");

    const [channels, loading, error] = useCollection(collection(db, "rooms"));

    
    

    const addChannel = () => {
        const  channelName = prompt('Please enter channel name');

        if (channelName) {
            addDoc(userCollection, {name: channelName});
        }

        
       
    };

    const selectChannel = () => {
        if(id) {
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    };

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{padding: 10}}/>}
            {Icon ? (
                <h3>{title}</h3>
                ): (
                        <SidebarOptionChannel>
                            
                            <span>#</span> {title} 
                            
                        </SidebarOptionChannel>    
                )}

        </SidebarOptionContainer>
    )
}

export default SidebarOptions;

export {db, auth, provider};



const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }
    > h3 {
        font-weight: 500;
    }
    > h3 > span {
        padding: 15px;

    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;

`