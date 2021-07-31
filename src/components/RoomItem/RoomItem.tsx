import { Avatar } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { ROOM } from '../../interfaces/chatInterface';
import { USER } from '../../interfaces/userInterface';
import { useAppSelector } from '../../redux/hook';
import useStyle from './style'
interface Props {
  room: ROOM
}

function RoomItem({ room }: Props) {
  const { pathname } = useLocation();
  const history = useHistory();
  const classes = useStyle();
  const currentUser = useAppSelector(state => state.user.currentUser);
  const [userReceive, setUserReceive] = useState<USER>({} as USER);
  const uid = room.members.filter((mem: string) => mem !== currentUser?.uid!)[0];


  useEffect(() => {
    axios.get(`https://601014b66c21e1001704fe27.mockapi.io/api/users/?uid=${uid}`)
      .then(res => setUserReceive(res.data[0]))
  }, [uid])
  const hanldeClickRoom = () => {
    history.push({
      pathname,
      search: `?idRoom=${room.idRoom}`
    })
  }

  return (
    <div  onClick={() => hanldeClickRoom()} className={classes.wrap}>
      <Avatar src={userReceive?.photoURL} />
      <span> {userReceive?.displayName}</span>
    </div>
  );
}

export default RoomItem;