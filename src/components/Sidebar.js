import React from 'react'
import styled from 'styled-components'
import { Add, Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt, Public } from '@mui/icons-material'
import { Create } from '@mui/icons-material'
import SidebarOptions from './SidebarOptions';
import { getFirestore, collection, getDocs, addDoc} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from './SidebarOptions';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { auth } from './SidebarOptions';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
function Sidebar(props) {
    const [channels, loading, error] = useCollection(collection(db, "rooms"));
    const [user] =  useAuthState(auth);
    
    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Football Fnatics</h2>
                    <h3>
                        <FiberManualRecord> </FiberManualRecord>
                        {user.displayName}
                    </h3>
                </SidebarInfo>
                <Create />
            </SidebarHeader>

            <SidebarOptions Icon={ExpandMore} title="Rules"/>
            <SidebarOptions Icon={FiberManualRecordIcon} title="Do Not Spam"/>
            
            <SidebarOptions Icon={FiberManualRecordIcon} title="Add news with source"/>
            <SidebarOptions Icon={FiberManualRecordIcon} title="Be Respectful"/>
            <SidebarOptions Icon={FiberManualRecordIcon} title="No Offensive Behaviour"/>
            <SidebarOptions Icon={FiberManualRecordIcon} title="Messi is the Goat"/>
            <SidebarOptions Icon={FiberManualRecordIcon} title="Do not Disrespect Attack on Titan"/>
           <Link to="/about"><SidebarOptions Icon={Public} title="News"/></Link>
            <hr />
            
            <Link to="/"> <SidebarOptions Icon={ExpandMore} title="Match Threads"/></Link> 

            <hr />
            {channels?.docs.map(doc => (
                <SidebarOptions key={doc.id} id={doc.id}   title={doc.data().name}/>

            ))}
            
            

        </SidebarContainer>
    )
}

export default Sidebar


const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    max-width: 260px;
    margin-top: 60px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
       
        border: 1px solid #49274b;
    }
    > Link > .SidebarOptions {
        text-decoration: none;
        color:white;
    }
`

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #49274b;
    padding: 13px;

    > .MuiSvgIcon-root {
       padding: 8px;
       color: #49274b;
       font-size: 18px;
       background-color: white;
       border-radius: 999px; 
    }
`
const SidebarInfo = styled.div`
    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`