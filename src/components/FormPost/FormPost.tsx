import { Avatar, Button, Grid, Modal, Typography } from "@material-ui/core";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { AsyncUser } from "../../common/AsyncUser";
import { listColor } from "./../../contstans/posts";
import useStyles from "./Style";
import ClearIcon from "@material-ui/icons/Clear";
import { useAppDispatch } from "../../redux/hook";
import { COMMENT, POST } from "../../interfaces/postInterface";
import { USER } from "../../interfaces/userInterface";
import { postActions } from "../../redux/slice/postSlice";
import { addListPostActions } from "../../redux/actions/postAction";
function FormPost() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState<any>(null);
  const [color, setColor] = useState("white");
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState<any>("");
  const [progress, setProgress] = useState(0);
  const storage = firebase.storage();
  const [text, setText] = useState("");
  const handleChange = async (e: any) => {
    console.log("change");

    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };
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
  console.log(url);

  useEffect(() => {
    AsyncUser().then(() => {
      setUser(firebase.auth().currentUser);
      console.log(firebase.auth().currentUser);
    });
  }, []);
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
  const handleSubmit = async() => {
    const currentUser: USER = {
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      uid: user?.uid,
    };
    const newPost:POST= {
      postId:`post-${Math.random()*67267637624}-${Math.random()*145252}`,
      createdAt: new Date(),
      title: text,
      color: color,
      urlImage: url,
      userPost: currentUser,
      listLike: [] as USER[],
      listComment: [] as COMMENT[],
    };
    await dispatch(addListPostActions(newPost));
    setOpen(false);
    setImage(null);
    setUrl(null);
    setText('');
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
        <div className={classes.post} onClick={() => setOpen(true)}>
          {user?.displayName.split(" ")[0]} bạn đang nghĩ gì thế?
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <KeyboardBackspaceIcon onClick={handleClose} />
            <Typography variant="h6">Đăng bài viết</Typography>
            <Button color="primary" variant="contained" size="small">
              Đăng
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
              Đăng
            </Button>
          </div>
        </div>
      </Modal>
    </Grid>
  );
}

export default FormPost;