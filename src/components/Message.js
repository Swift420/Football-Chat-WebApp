import React from 'react'
import styled from 'styled-components'
function Message({message, timestamp, user, userImage }) {
   //console.log(timestamp?.toDate())
    return (
        <MessageContainer>
            <img src={userImage} alt="" />
            <MessageInfo>
                <h4>
                    {user}
                    <span>
                        
                        {/* {new Date(timestamp?.toDate()).toUTCString()} */}
                    </span>
                </h4>
                <p>{message}</p>
           
            </MessageInfo>
        </MessageContainer>
    )
}

export default Message


const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height: 40px;
        
        border-radius: 10px ;
    }
`

const MessageInfo = styled.div`
    padding-left: 10px;

    
`