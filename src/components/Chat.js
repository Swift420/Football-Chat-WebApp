import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { StarBorderOutlined, InfoOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput'
import { selectRoomId } from '../features/appSlice'
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./SidebarOptions"
import Message from "./Message"
function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails]  = useDocument(
        roomId && db.collection("rooms").doc(roomId)
    )

    const [roomMessage, loading] = useCollection(
        roomId && db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc")
    );

    useEffect(()=> {
        chatRef?.current?.scrollIntoView({
            behaviour: "smooth",
    });
    }, [roomId, loading])

    
    return (
        <ChatContainter>
            {roomDetails && roomMessage && (
                <>
                <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                                <StarBorderOutlined></StarBorderOutlined>
                            </h4>
    
                        </HeaderLeft>
    
                        <HeaderRight>
                            <p>
                                <InfoOutlined />Details
                            </p>
                        </HeaderRight>
                </Header>
    
                <ChatMessages>
                    { roomMessage?.docs.map(doc => {
                        const {message, timestamp, user, userImage} = doc.data();
                        console.log(userImage);
                        console.log(timestamp);
                        return (
                            <Message 
                                key={doc.id}
                                message={message}
                                timestamp={timestamp}
                                user={user}
                                userImage={userImage}
    
                                
    
                            />
                        )
                    })}
                    <ChatBottom ref={chatRef}/>
                </ChatMessages>
    
                <ChatInput 
                chatRef={chatRef}
                ChannelName={roomDetails?.data().name}
                    channelId={roomId}
                />
              </> 
            )}
            
        </ChatContainter>
    )
}

export default Chat

const ChatMessages = styled.div``

const HeaderRight = styled.div`
    > p {
        display:flex;
        align-items: center; 
        font-size: 14px;
    }
    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
       
        font-size: 16px;
    }
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const ChatContainter = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll ;
    margin-top: 60px;

`

const ChatBottom = styled.div`
    padding-bottom: 200px;
`