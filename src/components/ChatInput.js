import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'

import { collection } from '@firebase/firestore';
import { doc } from "firebase/firestore"; 
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { getFirestore,  getDocs, addDoc} from 'firebase/firestore';
//import "firebase/compat/firestore"
import firebase from "firebase/compat"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './SidebarOptions';


import { db } from "./SidebarOptions"
function ChatInput({ChannelName, channelId, chatRef}) {
    const [input, setInput] = useState("");
    const [user] =  useAuthState(auth);
    const inputRef = useRef(null);
    const userCollection2 = collection(db, "messages");
    console.log(channelId)
    const sendMessage = (e) => {
        e.preventDefault();
        
        if (!channelId) {
            return false
        }
        
        // collection(db, "rooms").doc(channelId).addDoc("messages", {message: input,
        //     timestamp: serverTimestamp(),
        //     user: 'Apollos',
        //     userImage: 'https://naniwallpaper.com/files/wallpapers/eren-yeager/1-EREN%20YEAGER-1080x1920.jpg'
        // });
    //    const ref1 = addDoc(collection(db,"rooms"));
    //     ref1.doc(channelId).addDoc(collection(db, "messages"), {message: input,
    //         timestamp: serverTimestamp()});
        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        });

        chatRef?.current?.scrollIntoView({
            behaviour: "smooth",
    });

        setInput('')

    }
    return (
        <ChatInputContainer>
            <form>
                <input 
                value={input}
                onChange={ (e)=>setInput(e.target.value) }
                placeholder={`Message #${ChannelName}`}
                 />
                <Button hidden type="submit" onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput


const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
        

    }
    > form > button {
        display: none !important;
    }
`