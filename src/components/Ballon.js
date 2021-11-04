import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { StarBorderOutlined, InfoOutlined } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput'
import { selectRoomId } from '../features/appSlice'
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "./SidebarOptions"
import Message from "./Message"
import firebase from "firebase/compat";
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@mui/icons-material';
import {  Button, TextField, Container, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions} from '@mui/material'

function Ballon() {
    const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [toUpdateId, setToUpdateId] = useState('');
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

    useEffect(() => {
        console.log('useEffect Hook!!!');
    
        db.collection('todos').orderBy('datetime', 'desc').onSnapshot(snapshot => {
          console.log('Firebase Snap!');
          setTodos(snapshot.docs.map(doc => {
            return {
              id: doc.id,
              name: doc.data().todo,
              datatime: doc.data().datatime
            }
          }))
        })
    
      }, []);
    
      const addTodo = (event) => {
        event.preventDefault();
        db.collection('todos').add({
          todo: input,
          datetime: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
      }
    
      const deleteTodo = (id) => {
        db.collection('todos').doc(id).delete().then(res => {
          console.log('Deleted!', res);
        });
      }
    
      const openUpdateDialog = (todo) => {
        setOpen(true);
        setToUpdateId(todo.id);
        setUpdate(todo.name);
      }
    
      const editTodo = () => {
        db.collection('todos').doc(toUpdateId).update({
          todo: update
        });
        setOpen(false);
      }
    
      const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <ChatContainter>
            
            <Container maxWidth="sm">

      <form noValidate>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="News"
          name="todo"
          autoFocus
          value={input}
          onChange={event => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTodo}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add News
      </Button>

      </form>

      <List dense={true}>
        {
          todos.map(todo => (

            <ListItem key={todo.id} >

              <ListItemText
                primary={todo.name}
                secondary={todo.datetime}
              />

              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Edit" onClick={() => openUpdateDialog(todo)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                  <DeleteOutlineRounded />
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          ))
        }
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={event => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>


    </Container >
            
        </ChatContainter>
    )
}

export default Ballon

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