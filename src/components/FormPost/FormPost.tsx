import { Avatar, Button, Grid, Modal, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { AsyncUser } from "../../common/AsyncUser";
import { COMMENT, POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import {
  addListPostActions,
  updatePostActions,
} from "../../redux/actions/postAction";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { uiActions } from "../../redux/slice/uiSilce";
import { listColor } from "./../../contstans/posts";
import useStyles from "./Style";
interface Props {
  post?: POST;
}
function FormPost({ post }: Props) {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    if (post) {
      dispatch(uiActions.closeModal());
    }
    setOpen(false);
  };
  // const [user, setUser] = useState<any>(null);
  const [color, setColor] = useState("white");
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState<any>("");
  const [progress, setProgress] = useState(0);
  const storage = firebase.storage();
  const [text, setText] = useState("");
  const user = useAppSelector((state) => state.user.currentUser);
  const handleChange = async (e: any) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (post) {
      setOpen(true);
      setUrl(post.urlImage);
      setText(post.title);
      setColor(post.color);
    }
  }, []);
  useEffect(() => {
    if (image) {
      setColor("white");
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
            });
        }
      );
    }
  }, [image]);
  const renderListColor = () => {
    let xhtml = listColor.map((color, index) => (
      <div
        onClick={() => setColor(color)}
        key={index}
        style={{ backgroundColor: `${color}` }}
        className={classes.colorBlock}
      ></div>
    ));
    return xhtml;
  };

  const handleClickClearImg = () => {
    setImage(null);
    setUrl(null);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (post) {
      if (
        post.color !== color ||
        post.title !== text ||
        post.urlImage !== url
      ) {
        const newPost: POST = {
          ...post,
          title: text,
          color: color,
          urlImage: url,
        };
        await dispatch(updatePostActions(newPost));
      }
    } else {
      const newPost: POST = {
        postId: `post-${Math.random() * 67267637624}-${Math.random() * 145252}`,
        createdAt: Date.now() as number,
        title: text,
        color: color,
        urlImage: url,
        userPost: user!,
        listLike: [] as USER[],
        listComment: [] as COMMENT[],
        contentType: "",
        uidUserPost:user?.uid!
      };
      await dispatch(addListPostActions(newPost));
    }
    setOpen(false);
    setImage(null);
    setUrl("");
    setText("");
    dispatch(uiActions.closeModal());
    setColor("white");
  };
  return (
    <Grid
      style={{ display: "flex", justifyContent: "center" }}
      item
      xs={12}
      md={12}
      sm={12}
    >
      <div className={classes.wrapPost}>
        <Avatar className={classes.avatar}  src={user?.photoURL} />
        {!post && (
          <div className={classes.post} onClick={() => setOpen(true)}>
            {user?.displayName.split(" ")[0]} bạn đang nghĩ gì thế?
          </div>
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <KeyboardBackspaceIcon onClick={handleClose} />
            <Typography variant="h6">
              {post ? "Cập nhật bài viết" : "Đăng bài viết"}
            </Typography>
            <Button
              onClick={() => handleSubmit()}
              color="primary"
              variant="contained"
              size="small"
            >
              {post ? "Cập nhật" : "Đăng"}
            </Button>
          </div>
          <div className={classes.info}>
            <Avatar className={classes.avatar} src={user?.photoURL}></Avatar>
            <Typography>{user?.displayName}</Typography>
          </div>
          <div style={{ background: `${color}` }} className={classes.content}>
            <textarea
              value={text}
              onChange={onChangeText}
              style={{
                background: `${color}`,
                color: `${color === "white" ? "black" : "white"}`,
              }}
              placeholder={`Bạn đang nghĩ gì thế`}
              className={classes.input}
            />
            {!url ? (
              <div className={classes.listColor}>{renderListColor()}</div>
            ) : (
              <div className={classes.wrapImg}>
                <div
                  style={{ backgroundImage: `url(${url})` }}
                  className={classes.imageUpload}
                >
                  <ClearIcon
                    onClick={() => handleClickClearImg()}
                    className={classes.deleteImg}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={classes.actionPost}>
            <div className={classes.addImage}>
              {color === "white" && (
                <label htmlFor="addImage" className={classes.addImageAction}>
                  <Typography>Thêm ảnh</Typography>
                  <InsertPhotoIcon className={classes.iconImage} />
                  {/* <button onClick={handleUpload}>Upload</button> */}
                </label>
              )}
              <div className={classes.imageContent}>
                <input
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  id="addImage"
                />
              </div>
            </div>
            <Button
              onClick={() => handleSubmit()}
              variant="contained"
              fullWidth
              color="primary"
            >
              {post ? "Cập nhật" : "Đăng"}
            </Button>
          </div>
        </div>
      </Modal>
    </Grid>
  );
}

export default FormPost;
