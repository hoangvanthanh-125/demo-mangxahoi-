import { Button, Grid } from "@material-ui/core";
import axios from "axios";
import firebase from "firebase";
import React from "react";
import { useHistory } from "react-router-dom";
import { USER } from "../../interfaces/userInterface";
import { useAppDispatch } from "../../redux/hook";
import { userActions } from "../../redux/slice/userSlice";
import useStyles from "./style";
function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      localStorage.setItem("token", await user.getIdToken());
      history.push("/");

      localStorage.setItem(
        "user",
        JSON.stringify({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        })
      );
    } else {
    }
  });

  const classes = useStyles();
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleClickLogin = () => {
  //   firebase.auth()
  // .signInWithPopup(provider)
    // firebase.auth().signInWithRedirect(provider);
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const { user } = result;
    if (result.additionalUserInfo?.isNewUser) {
      dispatch(userActions.fetchCurrentUser({
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
        email: user?.email,
        urlBia:'',
      }));
      axios.post("https://601014b66c21e1001704fe27.mockapi.io/api/users", {
        displayName: user?.displayName,
        uid: user?.uid,
        photoURL: user?.photoURL,
        email: user?.email,
        urlBia:'',
      } as USER);
    }
   history.goBack();
    

  });
  };
  return (
    <Grid container item className={classes.wrap}>
      <Grid item xs={12} sm={12} md={12}>
        <div className="wrap-title">
          <span className="name-app-1">O</span>
          <span className="name-app-2">U</span>
          <span className="name-app-3">T</span>
          <span className="name-app-4">S</span>
          <span className="name-app-5">T</span>
          <span className="name-app-6">A</span>
          <span className="name-app-7">G</span>
          <span className="name-app-8">R</span>
          <span className="name-app-9">A</span>
          <span className="name-app-10">M</span>
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Button
          fullWidth
          onClick={() => handleClickLogin()}
          className={classes.buttonLogin}
          variant="contained"
          color="primary"
        >
          Đăng nhập với google
        </Button>
      </Grid>
    </Grid>
  );
}

export default Login;
