import qs from "query-string";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LAST_MESSAGE, MESSAGE, ROOM } from "../../interfaces/chatInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import RoomItem from "../RoomItem/RoomItem";
import useStyle from "./style";
import firebase from "firebase";
import { roomActions } from "../../redux/slice/roomChatSlice";
import Search from "../Search/Search";
import { getId } from "../FormComment/FormComment";
interface Props {
  listRoom: NEW_ROOM[];
  handleClickSetCurrentRoom: (room: NEW_ROOM) => void;
  setOpenModal: () => void;
  closeModal: () => void;
  currentRoom: NEW_ROOM;
  listMessage: MESSAGE[];
  loading: boolean;
}
interface NEW_ROOM extends ROOM {
  userReceive: USER;
}

function Rooms({
  listRoom,
  handleClickSetCurrentRoom,
  setOpenModal,
  closeModal,
  listMessage,
  currentRoom,
  loading,
}: Props) {
  const classes = useStyle();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { search } = useLocation();
  const obj = qs.parse(search);
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const renderListRoom = () => {
    let xhtml = null;
    if (listRoom.length > 0) {
      xhtml = listRoom.map((room: NEW_ROOM, index: number) => {
        return (
          <div
            onClick={() => handleClickSetRoom(room)}
            key={index}
            style={{
              background: `${obj?.idRoom === room?.idRoom ? "lightgray" : ""}`,
            }}
          >
            <RoomItem
              loading={loading}
              lastMessage={listMessage[listMessage?.length - 1]}
              room={room}
            />
          </div>
        );
      });
    }
    return xhtml;
  };
  const handleClickSetRoom = (room: NEW_ROOM) => {
    if (handleClickSetCurrentRoom) {
      handleClickSetCurrentRoom(room);
      setOpenModal();
      if (
        currentRoom?.lastMessage?.userSentUid !== user?.uid &&
        currentRoom?.lastMessage?.createdAt
      ) {
        firebase.firestore().collection("rooms").doc(currentRoom?.id).update({
          "lastMessage.checked": true,
        });
        dispatch(
          roomActions.updateRoom({
            ...room,
            lastMessage: {
              ...room?.lastMessage,
              checked: true,
            },
          })
        );
      }
    }
  };
  const handleClickUser = async (option: USER) => {
    if (currentUser) {
      var p = 0;
      const room = await firebase
        .firestore()
        .collection("rooms")
        .where("members", "array-contains", option?.uid)
        .get();
      room.docs.forEach((doc) => {
        if (doc.data().members.includes(currentUser?.uid!)) {
          p = 1;
          history.push({
            pathname: "/chat",
            search: `?idRoom=${doc?.data()?.idRoom}`,
            state: {
              newRoom: { ...doc?.data(), id: doc?.id },
            },
          });
          return;
        }
      });
      if (p === 0) {
        firebase
          .firestore()
          .collection("rooms")
          .add({
            idRoom: getId(),
            createdAt: Date.now(),
            members: [option?.uid, currentUser?.uid],
            lastMessage: {} as LAST_MESSAGE,
          } as ROOM)
          .then((res) => {
            res.get().then((docs) => {
              history.push({
                pathname: "/chat",
                search: `?idRoom=${docs?.data()?.idRoom}`,

                state: {
                  newRoom: { ...docs?.data(), id: docs?.id },
                },
              });
            });
          });
      }
    } else {
      history.push("/login");
    }
  };
  return (
    <div className={classes.wrap}>
      <div className={classes.header}>
        <Search height={10} clickUSer={handleClickUser} />
      </div>
      {listRoom.length > 0 ? (
        <div className={classes.body}>{renderListRoom()}</div>
      ) : (
        <div className={classes.noRoom}>Tìm kiếm bạn bè để trò chuyện</div>
      )}
    </div>
  );
}

export default Rooms;
