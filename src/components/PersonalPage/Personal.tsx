import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import FormPost from "../FormPost/FormPost";
import PostItem from "../PostItem/PostItem";
import useStyles from "./style";
import Icon from "@material-ui/core/Icon";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import firebase from "firebase";

import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { uiActions } from "../../redux/slice/uiSilce";
import FormChangeImage from "../FormChangeImage/FormChangeImage";
import Loading from "../../common/loading/loading";
import { useHistory, useParams } from "react-router-dom";
import { ROOM } from "../../interfaces/chatInterface";
import { getId } from "../FormComment/FormComment";
function Personal() {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const [user, setUser] = useState<USER>({} as USER);
  const { currentUser } = useAppSelector((state) => state.user);
  const { listPost } = useAppSelector((state) => state.posts);
  const [listPostUser, setListPost] = useState<POST[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      Promise.all([
        axios.get(
          `https://601014b66c21e1001704fe27.mockapi.io/api/users?uid=${id}`
        ),
        axios.get(
          `https://601014b66c21e1001704fe27.mockapi.io/api/posts/?uidUserPost=${id}`
        ),
      ])
        .then((res) => {
          setUser(res[0].data[0]);
          setListPost(
            res[1].data.sort((post1: POST, post2: POST) => {
              if (post1.createdAt > post2.createdAt) {
                return -1;
              }
              return 1;
            })
          );
        })
        .then(() => {
          setLoading(false);
        });
    };
    fetch();
  }, [id, currentUser, listPost]);
  const renderListPosts = () => {
    let xhtml = null;
    if (listPostUser.length > 0) {
      xhtml = listPostUser.map((post) => (
        <PostItem key={post.id} post={post} />
      ));
    }
    return xhtml;
  };
  const changeImg = (type: string) => {
    dispatch(uiActions.openModal());
    dispatch(
      uiActions.fetchHeaderModal(
        <div className={classes.headerModal}>
          <h4>{type === "anhBia" ? "Đổi ảnh bìa" : "Đổi ảnh đại diện"}</h4>
          <ArrowForwardIcon
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(uiActions.closeModal())}
          />
        </div>
      )
    );
    dispatch(
      uiActions.fetchBodyModal(
        <FormChangeImage
          currentUser={user!}
          type={type}
          listPost={listPostUser}
        />
      )
    );
  };
  const handleClickAnhBia = () => {
    // if(user.urlBia && idPostBia){
    //   history.push(`/comment/${idPostBia}`)
    // }
  };
  const handClickAddRoomChat = async () => {
    var p = 0;
    const room = await firebase
      .firestore()
      .collection("rooms")
      .where("members", "array-contains", user?.uid)
      .get();
    room.docs.forEach((doc) => {
      if (doc.data().members.includes(currentUser?.uid!)) {
        p = 1;
        history.push({
          pathname: "/chat",
          search: `?idRoom=${doc.data()?.idRoom}`,
          state: {
            newRoom: doc?.data(),
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
          members: [user.uid, currentUser?.uid],
        } as ROOM)
        .then((res) => {
          res.get().then((docs) => {
            history.push({
              pathname: "/chat",
              search: `?idRoom=${docs?.data()?.idRoom}`,

              state: {
                newRoom: docs?.data(),
              },
            });
          });
        });
    }
  };

  return !loading ? (
    <Grid className={classes.container} container>
      <Grid item sm={9} xs={12} md={9} className={classes.wrapInfo}>
        <div className={classes.wrapAnhbia}>
          <img
            onClick={() => handleClickAnhBia()}
            className={classes.anhbia}
            src={`${
              user?.urlBia
                ? user?.urlBia
                : "https://st.quantrimang.com/photos/image/2020/07/30/Hinh-Nen-Trang-10.jpg"
            }`}
            alt=""
          />

          {currentUser?.uid === id && (
            <Button
              onClick={() => changeImg("anhBia")}
              variant="contained"
              color="primary"
              className={classes.buttonAnhBia}
              endIcon={<Icon>photo</Icon>}
            >
              <Typography>Đổi ảnh bìa</Typography>
            </Button>
          )}
        </div>
        <div className={classes.wrapAvt}>
          <Avatar className={classes.avatar} src={user?.photoURL} />
          {currentUser?.uid === id && (
            <IconButton
              onClick={() => changeImg("avt")}
              size="small"
              className={classes.iconChangeAvt}
            >
              <CameraAltIcon />
            </IconButton>
          )}
        </div>
        <div className={classes.nameUser}>{user?.displayName}</div>
        {currentUser?.uid !== user?.uid && (
          <Button
            className={classes.buttonInbox}
            variant="contained"
            onClick={() => handClickAddRoomChat()}
          >
            Nhắn tin
          </Button>
        )}
      </Grid>

      <Grid
        className={classes.wrapbaiDang}
        container
        item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        sm={12}
        md={12}
        xs={12}
      >
        <Grid item sm={12} md={7} xs={12}>
          {currentUser?.uid === id && <FormPost />}
          {listPostUser.length > 0 ? (
            renderListPosts()
          ) : (
            <div className={classes.noPost}>Chưa có bài đăng</div>
          )}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <Loading />
  );
}

export default Personal;
