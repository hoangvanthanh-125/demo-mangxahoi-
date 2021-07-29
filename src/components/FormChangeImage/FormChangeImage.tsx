import { Button, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { POST } from "../../interfaces/postInterface";
import useStyles from "./style";
import ClearIcon from "@material-ui/icons/Clear";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { USER } from "../../interfaces/userInterface";
import axios from "axios";
import { useAppDispatch } from "../../redux/hook";
import { userActions } from "../../redux/slice/userSlice";
import { uiActions } from "../../redux/slice/uiSilce";
import { addListPostActions } from "../../redux/actions/postAction";
import { getId } from "../FormComment/FormComment";
interface Props {
  listPost: POST[];
  currentUser: USER;
  type: string;
}
function FormChangeImage({ listPost, currentUser, type }: Props) {
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();
  var listImg = [];
  listPost.forEach((post: POST) => {
    if (post.urlImage) {
      listImg.push(post.urlImage);
    }
  });

  const classes = useStyles();
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<any>(null);
  const storage = firebase.storage();

  const renderListImage = () => {
    let xhtml = null;
    if (listPost.length > 0) {
      xhtml = listPost.map((post: POST) => {
        if (post.urlImage) {
          return (
            <img
              key={post.postId}
              onClick={() => setUrl(post.urlImage!)}
              src={post.urlImage}
              alt=""
              className={classes.image}
            />
          );
        }
      });
    }
    return xhtml;
  };
  useEffect(() => {
    if (image) {
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
              setProgress(0);
              setUrl(url);
            });
        }
      );
    }
  }, [image]);

  const handleChange = async (e: any) => {
    if (e.target.files[0]) {
      await setImage(e.target.files[0]);
    }
  };
  const handleClickChangeImage = async () => {
    if (currentUser) {
      var res;
      if (type === "anhBia") {
        res = await axios.put(
          `https://601014b66c21e1001704fe27.mockapi.io/api/users/${currentUser.id}`,
          {
            ...currentUser,
            urlBia: url,
          }
        );
        await dispatch(
          addListPostActions({
            color: "white",
            createdAt: Date.now() as number,
            listComment: [],
            listLike: [],
            postId: getId(),
            title: "",
            urlImage: url,
            userPost: currentUser,
            contentType: "đã cập nhật ảnh bìa",
            uidUserPost:currentUser.uid
          } as POST)
        );
      } else {
        res = await axios.put(
          `https://601014b66c21e1001704fe27.mockapi.io/api/users/${currentUser.id}`,
          {
            ...currentUser,
            photoURL: url,
          }
        );
        await dispatch(
          addListPostActions({
            color: "white",
            createdAt: Date.now() as number,
            listComment: [],
            listLike: [],
            postId: getId(),
            title: "",
            urlImage: url,
            userPost: currentUser,
            contentType: "đã cập nhật ảnh đại diện ",
            uidUserPost:currentUser.uid
          } as POST)
        );
      }
      dispatch(userActions.fetchCurrentUser(res.data));
      dispatch(uiActions.closeModal());
    }
  };
  return (
    <div className={classes.wrap}>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        id="change-image"
      />

      <Button className={classes.button} variant="contained">
        <label style={{ cursor: "pointer" }} htmlFor="change-image">
          Tải ảnh lên
        </label>
      </Button>
      {progress > 0 && (
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={progress}
        />
      )}
      {url && (
        <div className={classes.wrapMainImg}>
          <IconButton
            size="small"
            className={classes.clearIcon}
            onClick={() => {
              setUrl("");
              setImage(null);
            }}
          >
            <ClearIcon />
          </IconButton>
          <img className={classes.mainImg} src={url} alt="" />
        </div>
      )}
      {!url && listImg.length > 0 && (
        <div className={classes.wrapImage}>
          <Typography variant="h6">Ảnh gợi ý</Typography>
          <div className={classes.listImage}>{renderListImage()}</div>
        </div>
      )}
      <Button
        disabled={!url}
        onClick={() => handleClickChangeImage()}
        className={classes.buttonPost}
        fullWidth
        variant="contained"
        color="primary"
      >
        Đăng
      </Button>
    </div>
  );
}

export default FormChangeImage;
